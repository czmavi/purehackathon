export interface Page<T> {
  items: T[];
  index: number;
}

export type Dictionary<K extends string, T> = { [P in K]: T };

export interface SearchableState<T> {
  error: string | null;
  pages: Dictionary<string, Page<T>>;
  items: Dictionary<string, T>;
  total: number | null;
  fetching: boolean;
}
