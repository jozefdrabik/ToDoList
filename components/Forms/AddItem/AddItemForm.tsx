"use client";

import { useMutation } from "@tanstack/react-query";
import { createNewItem, queryClient } from "@/util/http";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AddItemSchema, schema } from "@/components/Forms/AddItem/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/Modal";
import { IForms } from "@/components/Forms/prop";
import ErrorBlock from "@/components/ErrorBlock";
import Input from "@/components/Input";
import { IItem } from "@/types/item";
import Button from "@/components/Button";

export default function AddItemForm({ isOpen, close }: IForms) {
  const params = useParams();

  const slug = params.slug;

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createNewItem,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["items", [slug]] })
        .then(close);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddItemSchema>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  function onSubmit(formData: IItem): void {
    formData.finished = false;
    mutate({ itemData: formData, slug: slug as string });
  }

  return (
    <Modal close={close} isOpen={isOpen}>
      {isError && (
        <ErrorBlock
          title="Nepodarilo sa vyvroriť nový item"
          message="Nepodarilo sa vytvoriť item. Skontrolujte si svoje zadané údaje a skúste to znova"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="titleAddItem"
          label="Názov"
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          id="descriptionAddItem"
          label="Popisok"
          textArea
          error={errors.description?.message}
          {...register("description")}
        />
        <Input
          id="deadlineAddItem"
          label="Deadline"
          type="date"
          error={errors.deadline?.message}
          {...register("deadline")}
        />
        <Button
          type="submit"
          label={isPending ? "Submitting..." : "Create new item"}
        />
      </form>
    </Modal>
  );
}
