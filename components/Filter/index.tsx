import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import { IFilter } from "@/components/Filter/prop";

export const filterData = ["All", "Finished", "Active"];

export default function Filter({
  selected,
  setSelected,
}: IFilter): React.ReactElement {
  return (
    <div className="w-full md:w-40 md:mt-4">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="space-x-4 md:space-x-0 md:space-y-6 flex flex-row md:flex-col "
      >
        {filterData.map((item) => (
          <Radio
            key={item}
            value={item}
            className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 w-full px-2 shadow-md data-[checked]:bg-white/10"
          >
            <div className="flex w-full items-center justify-between">
              <p className="font-semibold">{item}</p>
              <CheckCircleIcon className="size-6 fill-indigo-600 opacity-0 transition group-data-[checked]:opacity-100" />
            </div>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
