import { useMemo, useState } from "react";
import { isMatch, disassembleHangul } from "../utils/koreanSearchUtils";

function useKoreanSearch<T>(
  items: T[],
  getSearchField: (item: T) => string
): {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: T[];
  resetSearch: () => void;
  isMatch: (source: string, target: string) => boolean;
  disassembleHangul: (text: string) => string;
} {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    return items.filter((item) => {
      const field = getSearchField(item);
      return isMatch(field, searchTerm);
    });
  }, [items, searchTerm, getSearchField]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    resetSearch: () => setSearchTerm(""),
    isMatch,
    disassembleHangul,
  };
}

export default useKoreanSearch;
