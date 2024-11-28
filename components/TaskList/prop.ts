import { IItem } from "@/types/item";

export interface ITaskList {
  tasks: IItem[];
  onCheckboxChange: (task: IItem) => void;
  slug: string;
}
