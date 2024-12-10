import GarbageType from "~/enums/garbage-type";

const en = {
  title: "GomiDoko",

  common: {
    actions: {
      close: "Close",
      submit: "Submit",
    },
    form: {
      validations: {
        minLength: "Minimum length is {{minLength}}",
        maxLength: "Maximum length is {{maxLength}}",
      },
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

  me: {
    username: {
      title: "Change Username",
      form: {
        fields: {
          username: {
            label: "Username",
            placeholder: "Enter your username",
          },
        },
        validations: {
          username: "Only alphanumeric characters and underscores are allowed",
        },
      },
      toast: {
        success: { title: "Username changed successfully!" },
      },
    },
  },
};

export default en;
