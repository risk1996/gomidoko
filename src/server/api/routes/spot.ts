import Elysia, { error, t } from "elysia";
import invariant from "tiny-invariant";

import GarbageType from "~/enums/garbage-type";
import { convertToLatLng, isValidLatLng } from "~/helpers/geo";
import { userSession } from "~/server/api/plugins/auth";
import { db } from "~/server/db";
import { spotTable } from "~/server/db/schema";

export const spotRoute = new Elysia({ prefix: "/spot" })
  .use(userSession())
  .post(
    "/",
    async ({ user, body }) => {
      const latLng = convertToLatLng(body.location);
      if (!isValidLatLng(latLng)) return error(400, null);

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
        location: t.Tuple([t.Number(), t.Number()]),
      }),
      response: {
        200: t.Object({
          data: t.Object({ id: t.String() }),
        }),
        400: t.Null(),
      },
    },
  );
