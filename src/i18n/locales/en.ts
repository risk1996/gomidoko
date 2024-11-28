import GarbageType from "~/enums/garbage-type";

const en = {
  title: "GomiDoko",

  common: {
    actions: {
      close: "Close",
      submit: "Submit",
    },
  },

  enums: {
    garbageType: {
      name: "Garbage Type",
      member: {
        [GarbageType.Burnables]: "Burnables",
        [GarbageType.NonBurnables]: "Non-burnables",
        [GarbageType.Plastics]: "Plastics",
        [GarbageType.BottlesAndCans]: "Bottles and cans",
        [GarbageType.PETProducts]: "PET products",
        [GarbageType.Paper]: "Paper",
      },
    },
  },

  spot: {
    entity: "Spot",

    create: {
      title: "Create new spot",
      toast: {
        success: { title: "Spot created successfully!" },
      },
    },
  },
};

export default en;
