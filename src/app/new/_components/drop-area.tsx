"use client";

import { DropZone } from "@/components/ui/drop-zone";
import { Description } from "@/components/ui/field";
import { FileTrigger } from "@/components/ui/file-trigger";
import type { DropEvent } from "@react-types/shared";
import { IconGallery } from "justd-icons";
import { isFileDropItem } from "react-aria-components";

type DropAreaProps = {
  isPending?: boolean;
  onDrop: (files: File[]) => void;
};

export const DropArea: React.FC<DropAreaProps> = ({ isPending, onDrop }) => {
  const onDropHandler = async (e: DropEvent) => {
    const item = e.items
      .filter(isFileDropItem)
      .find((item) => item.type === "image/jpeg" || item.type === "image/png");
    if (item) {
      const file = await item.getFile();
      onDrop([file]);
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSelectHandler = async (e: any) => {
    if (e) {
      const files = Array.from([...e]);
      onDrop(files);
    }
  };

  return (
    <DropZone
      isDisabled={isPending}
      getDropOperation={(types) =>
        types.has("image/jpeg") || types.has("image/png") ? "copy" : "cancel"
      }
      onDrop={onDropHandler}
    >
      <div className="grid space-y-3">
        <div className="mx-auto grid size-12 place-content-center rounded-full border bg-secondary/70 group-data-[drop-target]:border-primary/70 group-data-[drop-target]:bg-primary/20">
          <IconGallery className="size-5" />
        </div>
        <div className="flex justify-center">
          <FileTrigger
            acceptedFileTypes={["image/png", "image/jpeg"]}
            allowsMultiple={false}
            onSelect={onSelectHandler}
          >
            Upload a file
          </FileTrigger>
        </div>
        <Description>Or drag and drop PNG, JPG, GIF up to 10MB</Description>
      </div>
      <input type="hidden" name="image" />
    </DropZone>
  );
};
