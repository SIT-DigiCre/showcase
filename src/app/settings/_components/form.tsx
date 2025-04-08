"use client";

import { Button } from "@/components/ui";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import { getInputProps, useForm } from "@conform-to/react";
import { getValibotConstraint, parseWithValibot } from "conform-to-valibot";
import { schema } from "./schema";
import { IconAt } from "justd-icons";
import { settingAction } from "./action";

type SettingFormProps = {
  defaultValue: {
    name: string | null;
    slug: string | null;
    bio: string | null;
  };
};

export const SettingForm: React.FC<SettingFormProps> = ({ defaultValue }) => {
  const [form, fields] = useForm({
    constraint: getValibotConstraint(schema),
    defaultValue,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });

  return (
    <Form id={form.id} onSubmit={form.onSubmit} action={settingAction}>
      <div className="flex flex-col gap-4">
        <TextField
          {...getInputProps(fields.name, { type: "text" })}
          key={fields.name.key}
          isRequired={fields.name.required}
          label="名前"
          errorMessage={fields.name.errors?.join(", ")}
        />
        <TextField
          {...getInputProps(fields.slug, { type: "text" })}
          key={fields.slug.key}
          isRequired={fields.slug.required}
          label="ユーザーID"
          prefix={<IconAt />}
          errorMessage={fields.slug.errors?.join(", ")}
        />
        <Textarea
          {...getInputProps(fields.bio, { type: "text" })}
          key={fields.bio.key}
          isRequired={fields.bio.required}
          label="自己紹介"
          placeholder="自己紹介を入力してください"
          errorMessage={fields.bio.errors?.join(", ")}
        />
      </div>
      <Button type="submit" className="mt-8">
        更新する
      </Button>
    </Form>
  );
};
