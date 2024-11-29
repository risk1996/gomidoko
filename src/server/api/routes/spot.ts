import { sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import invariant from "tiny-invariant";

import GarbageType from "~/enums/garbage-type";
import { userSession } from "~/server/api/plugins/auth";
import { db } from "~/server/db";
import { spotTable } from "~/server/db/schema";

export const spotRoute = new Elysia({ prefix: "/spot" })
  .get(
    "/",
    async ({ query }) => {
      const results = await db
        .select({
          id: spotTable.id,
          types: spotTable.types,
          location: spotTable.location,
        })
        .from(spotTable)
        .where(
          sql`ST_MakeEnvelope(${query.area[0]}, ${query.area[1]}, ${query.area[2]}, ${query.area[3]}, 4326) && ${spotTable.location}`,
        );

      return { data: results };
    },
    {
      query: t.Object({
        area: t.Tuple([
          t.Number({ minimum: -90, maximum: 90 }),
          t.Number({ minimum: -180, maximum: 180 }),
          t.Number({ minimum: -90, maximum: 90 }),
          t.Number({ minimum: -180, maximum: 180 }),
        ]),
      }),
      response: {
        200: t.Object({
          data: t.Array(
            t.Object({
              id: t.String(),
              types: t.Array(t.Enum(GarbageType)),
              location: t.Tuple([t.Number(), t.Number()]),
            }),
          ),
        }),
      },
    },
  )
  .use(userSession())
  .post(
    "/",
    async ({ user, body }) => {
      const results = await db
        .insert(spotTable)
        .values({
          createdBy: user.id,
          updatedBy: user.id,
          types: body.types,
          location: body.location,
        })
        .returning({ id: spotTable.id });
      const result = results[0];
      invariant(result, "Failed to insert spot");

      return { data: { id: result.id } };
    },
    {
      body: t.Object({
        types: t.Array(t.Enum(GarbageType)),
        location: t.Tuple([
          t.Number({ minimum: -90, maximum: 90 }),
          t.Number({ minimum: -180, maximum: 180 }),
        ]),
      }),
      response: {
        200: t.Object({
          data: t.Object({ id: t.String() }),
        }),
        400: t.Object({}),
      },
    },
  );
