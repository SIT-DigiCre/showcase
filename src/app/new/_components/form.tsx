"use client";

import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { postAction } from "./action";
import { useActionState } from "react";

export function PostForm() {
  const [lastResult, action] = useActionState(postAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      title: "",
      description: "",
      content: "",
      isVisible: false,
    },
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });

  return (
    <Form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex flex-col gap-4">
        <TextField
          name={fields.title.name}
          label="タイトル"
          errorMessage={fields.title.errors?.join(", ")}
        />
        <TextField
          name={fields.description.name}
          label="説明文"
          className="resize-none"
          errorMessage={fields.description.errors?.join(", ")}
        />
        <Textarea
          name={fields.content.name}
          label="コンテンツ"
          className="resize-none"
          placeholder="コンテンツを入力してください"
          errorMessage={fields.content.errors?.join(", ")}
        />
        <Checkbox name={fields.isVisible.name} label="公開する" />
        <Button type="submit">投稿する</Button>
      </div>
    </Form>
  );
}
