import { useMemo, useState } from "react";
import {
  isMatch,
  disassembleHangul,
  getMatchScore,
} from "../utils/koreanSearchUtils";

function useKoreanSearch<T>(
  items: T[],
  getSearchField: (item: T) => string,
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

    const matched = items.filter((item) => {
      const field = getSearchField(item);
      return isMatch(field, searchTerm);
    });

    // 매칭된 항목들을 점수 순으로 정렬 (낮은 점수가 우선)
    return matched.sort((a, b) => {
      const scoreA = getMatchScore(getSearchField(a), searchTerm);
      const scoreB = getMatchScore(getSearchField(b), searchTerm);
      return scoreA - scoreB;
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
