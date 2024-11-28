"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteItem, fetchItem, queryClient } from "@/util/http";
import { useParams, useRouter } from "next/navigation";
import LoadingIndicator from "@/components/LoadingIndicator";
import React from "react";
import Modal from "@/components/Modal";
import ErrorBlock from "@/components/ErrorBlock";
import { ISlugID, ISlugIDSignal } from "@/types/http";
import Button from "@/components/Button";

export default function Item(): React.ReactElement {
  const params = useParams();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const id = params.id;
  const slug = params.slug;

  const { data, isPending, isError } = useQuery({
    queryKey: ["items", [id, slug]],
    queryFn: ({ signal }) => fetchItem({ signal, id, slug } as ISlugIDSignal),
    staleTime: 1000,
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeletion,
  } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", [id, slug]],
        refetchType: "none",
      });
      router.push(`/list/${slug}`);
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ slug, id } as ISlugID);
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="Failed to load ToDo list"
        message="Please try again later."
      />
    );
  }

  if (!data) {
    content = "aa";
  }

  if (data) {
    content = (
      <div className="max-w-md">
        <h2 className="text-3xl font-semibold text-gray-700">{data.title}</h2>
        <p className="text-xl text-gray-500 mt-5">{data.description}</p>
        <p className="text-lg text-gray-400 mt-5 my-10">
          Deadline: {new Date(data.deadline).toLocaleDateString()}
        </p>
        <div className="flex justify-center">
          <Button label="Delete item" onClick={handleStartDelete} />
        </div>
      </div>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal isOpen={true} close={handleStopDelete}>
          <h2 className="text-xl font-semibold mb-6">Are you sure?</h2>
          <p className="text-lg">
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="mt-10">
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <div className="flex justify-between">
                <Button label="Cancel" secondary onClick={handleStopDelete} />
                <Button onClick={handleDelete} label="Delete" />
              </div>
            )}
          </div>
          {isErrorDeletion && (
            <ErrorBlock
              className="mt-5"
              title="Failed to delete event"
              message="Failed to delete event, please try again later."
            />
          )}
        </Modal>
      )}
      <div className="flex justify-center">{content}</div>
    </>
  );
}
