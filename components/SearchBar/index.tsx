import React from "react";
import { ISearchBar } from "@/components/SearchBar/prop";
import debounce from "lodash/debounce";

export default function SearchBar({
  onSearch,
}: ISearchBar): React.ReactElement {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 300),
    [onSearch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleChange}
      className="h-12 w-32 md:w-96 p-4 border border-gray-300 rounded-lg"
    />
  );
}
