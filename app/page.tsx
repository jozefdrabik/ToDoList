"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchToDoList } from "@/util/http";
import React from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Link from "next/link";
import AddListForm from "@/components/Forms/AddList/AddListForm";
import ErrorBlock from "@/components/ErrorBlock";
import { IList } from "@/types/list";
import Button from "@/components/Button";

export default function Home(): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ["lists"],
    queryFn: ({ signal }) => fetchToDoList({ signal }),
    staleTime: 1000,
  });

  function close() {
    setIsOpen(false);
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

  if (data) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {data.map((list: IList) => (
          <Link
            href={`list/${list.slug}`}
            key={list.slug}
            className="bg-gray-50 rounded-lg shadow p-5"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {list.title}
            </h2>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center">
      {isOpen && <AddListForm isOpen={isOpen} close={close} />}
      <Button
        className="mb-10"
        label="Add list"
        onClick={() => setIsOpen(true)}
      />
      {content}
    </div>
  );
}
