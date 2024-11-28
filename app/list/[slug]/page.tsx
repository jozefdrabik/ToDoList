"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchItemsOfList, queryClient, updateItem } from "@/util/http";
import LoadingIndicator from "@/components/LoadingIndicator";
import React from "react";
import { useParams } from "next/navigation";
import AddItemForm from "@/components/Forms/AddItem/AddItemForm";
import { IItem } from "@/types/item";
import { ISlugSignal } from "@/types/http";
import TaskList from "@/components/TaskList";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import BackIcon from "@/components/BackIcon";

export default function List(): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [filteredData, setFilteredData] = React.useState<IItem[] | null>(null);
  const [displayedData, setDisplayedData] = React.useState<IItem[]>([]);
  const [selected, setSelected] = React.useState("All");
  const params = useParams();

  const slug = params.slug;

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["items", [slug]],
    queryFn: ({ signal }) => fetchItemsOfList({ signal, slug } as ISlugSignal),
    retry: 2,
  });

  React.useEffect(() => {
    if (isSuccess) {
      setFilteredData(data);
    }
  }, [data, isSuccess]);

  const { mutate } = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", [slug]] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["items", [slug]] });
    },
  });

  const handleCheckboxChange = (task: IItem) => {
    setFilteredData(
      (prev) =>
        prev?.map((t) =>
          t.id === task.id ? { ...t, finished: !task.finished } : t,
        ) || null,
    );

    mutate({
      itemData: { ...task, finished: !task.finished },
      slug: slug as string,
      id: task.id as string,
    });
  };

  const handleSearch = (query: string): void => {
    if (!displayedData) return;
    const filtered = displayedData.filter(
      (item: IItem) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    if (!data) return;

    let filtered: IItem[];

    if (selected === "Finished") {
      filtered = data.filter((item: IItem) => item.finished);
    } else if (selected === "Active") {
      filtered = data.filter(
        (item: IItem) =>
          new Date(item.deadline) >= new Date() && !item.finished,
      );
    } else {
      filtered = data;
    }

    setDisplayedData(filtered);
    setFilteredData(filtered);
  }, [data, selected]);

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (!filteredData && isError) {
    content = (
      <div className="flex items-center justify-center w-full">
        <h2 className="font-bold text-2xl">No data found.</h2>
      </div>
    );
  }

  if (filteredData) {
    content = (
      <TaskList
        tasks={filteredData}
        onCheckboxChange={handleCheckboxChange}
        slug={slug as string}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-10">
      <BackIcon link="/" />
      <div className="flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <Button label="Add item to List" onClick={() => setIsOpen(true)} />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-40">
          <Filter setSelected={setSelected} selected={selected} />
        </div>
        {content}
      </div>
      {isOpen && <AddItemForm isOpen={isOpen} close={() => setIsOpen(false)} />}
    </div>
  );
}
