import * as v from "valibot";

export const schema = v.object({
  title: v.string("タイトルは必須です"),
  description: v.string("説明文は必須です"),
  content: v.string("コンテンツは必須です"),
  isVisible: v.boolean("公開するかどうかは必須です"),
  blocks: v.array(
    v.object({
      fileUrl: v.string(),
      type: v.picklist(["image", "audio", "video", "asset"]),
      name: v.string("ファイル名は必須です"),
    })
  ),
});

export type Obj = v.InferOutput<typeof schema>;
