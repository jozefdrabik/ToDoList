import { QueryClient } from "@tanstack/react-query";
import {
  IData,
  IDataIDSlug,
  IDataSlug,
  ISignal,
  ISlugID,
  ISlugIDSignal,
  ISlugSignal,
} from "@/types/http";
import { IItem } from "@/types/item";
import { IList } from "@/types/list";

export const queryClient = new QueryClient();

export async function fetchToDoList({ signal }: ISignal) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "lists";

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the lists");
  }

  return await response.json();
}

export async function fetchItem({ slug, id, signal }: ISlugIDSignal) {
  const url =
    process.env.NEXT_PUBLIC_API_ENDPOINT + `lists/${slug}/items/${id}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the lists");
  }

  return await response.json();
}

export async function fetchItemsOfList({ signal, slug }: ISlugSignal) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `lists/${slug}/items`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("An error occurred while fetching the items");
  }

  return await response.json();
}

export async function createNewItem({ itemData, slug }: IDataSlug<IItem>) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `lists/${slug}/items`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while creating new item");
  }

  return await response.json();
}

export async function createNewList({ itemData }: IData<IList>) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `lists/`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while creating new item");
  }

  return await response.json();
}

export async function deleteItem({ slug, id }: ISlugID) {
  const url =
    process.env.NEXT_PUBLIC_API_ENDPOINT + `lists/${slug}/items/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("An error occurred while creating new item");
  }

  return response.json();
}

export async function updateItem({ itemData, slug, id }: IDataIDSlug<IItem>) {
  const url =
    process.env.NEXT_PUBLIC_API_ENDPOINT + `lists/${slug}/items/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred while creating new item");
  }

  return response.json();
}
