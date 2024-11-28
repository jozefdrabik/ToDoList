export interface IItem {
  title: string;
  description: string;
  deadline: Date;
  finished?: boolean;
  id?: string;
  listId?: string;
}
