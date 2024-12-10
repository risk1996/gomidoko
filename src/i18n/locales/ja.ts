import GarbageType from "~/enums/garbage-type";
import type { RawDictionary } from "~/i18n";

const ja: RawDictionary = {
  title: "ゴミどこ",

  common: {
    actions: {
      close: "閉じる",
      submit: "送信",
    },
    form: {
      validations: {
        minLength: "最小の長さは{{minLength}}です",
        maxLength: "最大の長さは{{maxLength}}です",
      },
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

  me: {
    username: {
      title: "ユーザー名を変更",
      form: {
        fields: {
          username: {
            label: "ユーザー名",
            placeholder: "ユーザー名を入力してください",
          },
        },
        validations: {
          username: "英数字とアンダースコアのみが許可されています",
        },
      },
      toast: {
        success: { title: "ユーザー名が変更されました！" },
      },
    },
  },
};

export default ja;
