import * as v from "valibot";

export const schema = v.object({
  title: v.string("タイトルは必須です"),
  description: v.string("説明文は必須です"),
  content: v.string("コンテンツは必須です"),
  isVisible: v.boolean("公開するかどうかは必須です"),
});
