export interface ISignal {
  signal: AbortSignal;
}

export interface ISlugSignal extends ISignal {
  slug: string;
}

export interface ISlugIDSignal extends ISignal {
  id: string;
  slug: string;
}

export interface ISlugID {
  slug: string;
  id: string;
}

export interface IData<T> {
  itemData: T;
}

export interface IDataSlug<T> {
  slug: string;
  itemData: T;
}

export interface IDataIDSlug<T> {
  slug: string;
  id: string;
  itemData: T;
}
