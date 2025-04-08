import * as v from "valibot";

export const schema = v.object({
  name: v.string(),
  slug: v.string(),
  bio: v.string(),
});

export type Obj = v.InferOutput<typeof schema>;
