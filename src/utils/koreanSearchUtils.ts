// 초성, 중성, 종성 리스트
const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const JONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

/**
 * 한글 한 글자를 자모 단위로 분해
 */
const splitHangulChar = (char: string): string[] => {
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) {
    return [char];
  }
  const syllableIndex = code - 0xac00;
  const cho = CHO[Math.floor(syllableIndex / (21 * 28))];
  const jung = JUNG[Math.floor((syllableIndex % (21 * 28)) / 28)];
  const jong = JONG[syllableIndex % 28];

  return jong ? [cho, jung, jong] : [cho, jung];
};
/**
 * 문자열 전체를 자모로 분리
 */
export const disassembleHangul = (str: string): string =>
  str
    .replace(/\s+/g, "")
    .toLowerCase()
    .split("")
    .flatMap(splitHangulChar)
    .join("");

/**
 * 한글 문자열이 다른 문자열을 포함하는지 확인
 * @param {string} source - 대상 문자열
 * @param {string} target - 검색어
 * @returns {boolean} - 포함 여부
 */
export const isMatch = (source: string, target: string): boolean => {
  if (!source || !target) {
    return target === "";
  }

  const src = disassembleHangul(source);
  const tgt = disassembleHangul(target);

  let i = 0;
  for (let j = 0; j < tgt.length; j++) {
    const t = tgt[j];
    let found = false;

    while (i < src.length) {
      if (src[i] === t) {
        found = true;
        i++;
        break;
      }
      i++;
    }

    if (!found) {
      return false;
    }
  }

  return true;
};

/**
 * 검색어가 문자열에서 매칭되는 시작 위치 인덱스를 반환
 * @param {string} source - 대상 문자열
 * @param {string} target - 검색어
 * @returns {number} - 매칭 시작 인덱스 (매칭되지 않으면 -1)
 */
export const getMatchStartIndex = (source: string, target: string): number => {
  if (!source || !target) {
    return target === "" ? 0 : -1;
  }

  const src = disassembleHangul(source);
  const tgt = disassembleHangul(target);

  let i = 0;
  let matchStartIndex = -1;

  for (let j = 0; j < tgt.length; j++) {
    const t = tgt[j];
    let found = false;

    while (i < src.length) {
      if (src[i] === t) {
        if (j === 0) {
          matchStartIndex = i;
        }
        found = true;
        i++;
        break;
      }
      i++;
    }

    if (!found) {
      return -1;
    }
  }

  return matchStartIndex;
};

/**
 * 검색어와 매칭되는 문자열의 점수를 계산
 * 매칭 위치가 빠를수록 점수가 높음
 * @param {string} source - 대상 문자열
 * @param {string} target - 검색어
 * @returns {number} - 점수 (낮을수록 상위, 매칭되지 않으면 Infinity)
 */
export const getMatchScore = (source: string, target: string): number => {
  const matchIndex = getMatchStartIndex(source, target);

  if (matchIndex === -1) {
    return Infinity;
  }

  // 매칭 시작 위치가 빠를수록 낮은 점수 (우선순위 높음)
  // 추가로 원본 문자열의 길이도 고려 (같은 위치라면 짧은 문자열이 우선)
  return matchIndex * 1000 + source.length;
};
