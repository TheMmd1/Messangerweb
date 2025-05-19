import { ChatData } from "@/lib/data/Conversation";
import { useState, useRef, useEffect } from "react";

// Define the custom hook with proper types
const useSearch = <T extends ChatData>(
  data: T[] | readonly T[], // Since data is filtered, it should be of type T[]
  searchField: keyof T, // Ensure the key exists on T
) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [query, setQuery] = useState<string>("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  // Close the search input when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Perform search based on the query
  useEffect(() => {
    if (query) {
      const filteredData = data?.filter((item) =>
        String(item[searchField]).toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filteredData);
    } else {
      setSearchResults([]);
    }
  }, [query, data, searchField]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  

  return {
    isSearchOpen,
    setIsSearchOpen,
    searchRef,
    iconRef,
    searchResults,
    query,
    setQuery,
    handleSearchChange,
  };
};

export default useSearch;
