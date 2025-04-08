"use client";

import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import { getInputProps, useForm } from "@conform-to/react";
import { getValibotConstraint, parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { postAction } from "./action";

export function PostForm() {
  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    defaultValue: {
      title: "",
      description: "",
      content: "",
      isVisible: false,
      items: [],
    },
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });
  const items = fields.items.getFieldList();

  return (
    <Form id={form.id} onSubmit={form.onSubmit} action={postAction}>
      <div className="flex flex-col gap-4">
        <TextField
          {...getInputProps(fields.title, { type: "text" })}
          isRequired={fields.title.required}
          label="タイトル"
          errorMessage={fields.title.errors?.join(", ")}
        />
        <TextField
          {...getInputProps(fields.description, { type: "text" })}
          isRequired={fields.description.required}
          label="説明文"
          placeholder="短い説明文を入力してください"
          errorMessage={fields.description.errors?.join(", ")}
        />
        <Textarea
          {...getInputProps(fields.content, { type: "text" })}
          isRequired={fields.content.required}
          label="コンテンツ"
          placeholder="長い説明文を入力してください"
          errorMessage={fields.content.errors?.join(", ")}
        />
        <Checkbox
          {...getInputProps(fields.isVisible, { type: "checkbox" })}
          isRequired={fields.title.required}
          name={fields.isVisible.name}
          label="公開する"
        />
        <ul className="flex justify-start">
          {items.map((item, index) => (
            <li
              key={item.key}
              className="flex flex-row justify-between gap-2 w-full items-center"
            >
              <input
                {...getInputProps(item, { type: "file" })}
                key={item.key}
              />
              <Button
                onPress={() => {
                  form.remove({
                    name: fields.items.name,
                    index,
                  });
                }}
                intent="danger"
              >
                削除
              </Button>
            </li>
          ))}
        </ul>
        <Button
          onPress={() => {
            form.insert({
              name: fields.items.name,
            });
          }}
        >
          追加する
        </Button>
      </div>
      <Button type="submit" className="mt-8">
        投稿する
      </Button>
    </Form>
  );
}
