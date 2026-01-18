````md
# korean-search-utils

React 기반 프로젝트에서 **한글 검색**을 지원하는 유틸리티 함수와 커스텀 훅입니다.

## ✨ 주요 기능

- 한글 자모 분리
- 초성 검색 지원
- React에서 사용할 수 있는 커스텀 훅 제공

## 📦 설치

```bash
npm install korean-search-utils
```
````

## 📘 사용법

### 유틸 함수

```ts
import { disassembleHangul, isMatch } from "korean-search-utils";

disassembleHangul("한글 hangul"); // "ㅎㅏㄴㄱㅡㄹ"
isMatch("ㅎㄱ HANGUL", "ㅎㄱHANGUL"); // true
isMatch("한글 hangul", "ㅎㄱhangul"); // true
isMatch("한글", "ㅎㄱ"); // true
```

### React 훅 사용 예시

```tsx
import { useKoreanSearch } from "korean-search-utils";

const fruits = [
  { name: "사과 apple" },
  { name: "오렌지 orange" },
  { name: "바나나 banana" },
];

function FruitSearch() {
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredGroupCodes,
    resetSearch,
  } = useKoreanSearch(list, (fruit) => fruit.name || "");

  return (
    <div>
      <input
        placeholder="과일 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 매칭 우선순위

- 검색어가 더 **앞에서** 매칭되는 항목을 우선 정렬합니다. 예: 목록에 `"한글 외국어"`과 `"외국어 한글"`이 있을 때 `ㅎㄱ`로 검색하면 `한글 외국어`가 먼저 노출됩니다.
- 같은 매칭 시작 위치에서는 원본 문자열 길이가 **짧은 항목**이 우선됩니다.

간단한 예시:

```ts
const list = [
  { name: '한글 외국어' },
  { name: '외국어 한글' },
];

// 'ㅎㄱ' 검색 결과 순서
// 1) '한글 외국어'  (매칭 시작 인덱스 0)
// 2) '외국어 한글'  (매칭 시작 인덱스 > 0)
```

### Hook 타입 시그니처

```ts
function useKoreanSearch<T>(
  items: T[],
  getText: (item: T) => string
): {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: T[];
};
```

---
