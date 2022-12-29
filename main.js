
function numToBrailleLetter(n) {
    let flags = 0;
    flags += (n & 0b00001000) << 3; // ⑦を左シフト
    flags += (n & 0b01110000) >> 1; // ④⑤⑥を右シフト
    flags += (n & 0b10000111);      // ①②③⑧はそのまま
    return String.fromCodePoint(flags + 0x2800);
}
