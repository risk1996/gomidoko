import { assertNever } from "~/helpers/assert";

enum GarbageType {
  Burnables = "BURNABLES",
  NonBurnables = "NON_BURNABLES",
  Plastics = "PLASTICS",
  BottlesAndCans = "BOTTLES_AND_CANS",
  PETProducts = "PET_PRODUCTS",
  Paper = "PAPER",
}

export function getGarbageIcon(type: GarbageType): string {
  switch (type) {
    case GarbageType.Burnables:
      return "tabler:flame";
    case GarbageType.NonBurnables:
      return "tabler:flame-off";
    case GarbageType.Plastics:
      return "tabler:shopping-bag";
    case GarbageType.BottlesAndCans:
      return "tabler:bottle";
    case GarbageType.PETProducts:
      return "tabler:vaccine-bottle";
    case GarbageType.Paper:
      return "tabler:news";
    default:
      assertNever(type);
  }
}

export default GarbageType;
