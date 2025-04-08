"use client";

import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import { getInputProps, useForm } from "@conform-to/react";
import { getValibotConstraint, parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { postAction, uploadFileAction } from "./action";
import { useTransition } from "react";
import { DropArea } from "./drop-area";

import Image from "next/image";

export function PostForm() {
  const [isPending, startTransition] = useTransition();
  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    defaultValue: {
      title: "",
      description: "",
      content: "",
      isVisible: false,
      blocks: [],
    },
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });
  const items = fields.blocks.getFieldList();

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
          className="resize-none"
          errorMessage={fields.description.errors?.join(", ")}
        />
        <Textarea
          {...getInputProps(fields.content, { type: "text" })}
          isRequired={fields.content.required}
          label="コンテンツ"
          className="resize-none"
          placeholder="コンテンツを入力してください"
          errorMessage={fields.content.errors?.join(", ")}
        />
        <Checkbox
          {...getInputProps(fields.isVisible, { type: "checkbox" })}
          isRequired={fields.title.required}
          name={fields.isVisible.name}
          label="公開する"
        />
        <div className="flex justify-start">
          {items.map((item) => (
            <div key={item.value?.fileUrl} className="flex flex-col gap-2">
              {item.value?.type === "image" && item.value.fileUrl && (
                <Image
                  src={item.value.fileUrl}
                  width={100}
                  height={100}
                  alt=""
                  className="aspect-square size-full object-contain"
                />
              )}
              <TextField
                {...getInputProps(item, { type: "text" })}
                isRequired={item.required}
                label="ファイル名"
                errorMessage={item.errors?.join(", ")}
              />
            </div>
          ))}
          <DropArea
            isPending={isPending}
            onDrop={(files) => {
              startTransition(async () => {
                await Promise.all(
                  files.map(async (file) => {
                    const result = await uploadFileAction(file);
                    form.insert({
                      name: fields.blocks.name,
                      defaultValue: {
                        fileUrl: result,
                        type: file.type.startsWith("image/")
                          ? "image"
                          : "asset",
                      },
                    });
                  })
                );
              });
            }}
          />
        </div>
        <Button type="submit">投稿する</Button>
      </div>
    </Form>
  );
}
