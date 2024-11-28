import Link from "next/link";
import { ITaskList } from "@/components/TaskList/prop";
import React from "react";

export default function TaskList({
  tasks,
  onCheckboxChange,
  slug,
}: ITaskList): React.ReactElement {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center w-full justify-center">
        <h2 className="font-bold text-2xl">No data</h2>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3 w-full">
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center">
          <Link
            href={`/list/${slug}/${task.id}`}
            className="p-3 bg-gray-100 rounded-lg justify-between flex items-center w-full"
          >
            <li>
              <h3 className="text-lg font-medium text-gray-700">
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
            </li>
          </Link>
          <input
            type="checkbox"
            checked={task.finished}
            onChange={() => onCheckboxChange(task)}
            className="ml-4 w-5 h-5 rounded border bg-white checked:bg-blue-500"
          />
        </div>
      ))}
    </ul>
  );
}
