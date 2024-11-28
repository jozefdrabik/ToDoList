"use client";

import { useMutation } from "@tanstack/react-query";
import { createNewList, queryClient } from "@/util/http";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/Modal";
import { AddListSchema, schema } from "@/components/Forms/AddList/schema";
import { IForms } from "@/components/Forms/prop";
import Input from "@/components/Input";
import ErrorBlock from "@/components/ErrorBlock";
import { IList } from "@/types/list";
import Button from "@/components/Button";

export default function AddListForm({ isOpen, close }: IForms) {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createNewList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] }).then(close);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddListSchema>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  function onSubmit(formData: IList): void {
    mutate({ itemData: formData });
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
          id="title"
          label="Názov"
          error={errors.title?.message}
          {...register("title")}
        />
        <Button
          type="submit"
          label={isPending ? "Submitting..." : "Create new list"}
        />
      </form>
    </Modal>
  );
}
