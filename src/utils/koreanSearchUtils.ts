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
