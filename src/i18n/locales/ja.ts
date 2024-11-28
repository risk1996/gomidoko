import GarbageType from "~/enums/garbage-type";
import type { RawDictionary } from "~/i18n";

const ja: RawDictionary = {
  title: "ゴミどこ",

  common: {
    actions: {
      close: "閉じる",
      submit: "送信",
    },
  },

  enums: {
    garbageType: {
      name: "ゴミの種類",
      member: {
        [GarbageType.Burnables]: "燃えるゴミ",
        [GarbageType.NonBurnables]: "燃えないゴミ",
        [GarbageType.Plastics]: "プラスチック",
        [GarbageType.BottlesAndCans]: "ビン・カン",
        [GarbageType.PETProducts]: "ペットボトル",
        [GarbageType.Paper]: "紙",
      },
    },
  },

  spot: {
    entity: "スポット",

    create: {
      title: "新しいスポットを作成",
      toast: {
        success: { title: "スポットが完成に作成されました！" },
      },
    },
  },
};

export default ja;
