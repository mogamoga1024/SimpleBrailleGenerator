
const pointsBinaryNumber = 0b00000000;

$(".point").click(function() {
    $(this).toggleClass("black");
});

// 参考元: https://qiita.com/zakuroishikuro/items/15d1a69178895edf9a21
function numToBrailleLetter(n) {
    let flags = 0;
    flags += (n & 0b00001000) << 3; // ⑦を左シフト
    flags += (n & 0b01110000) >> 1; // ④⑤⑥を右シフト
    flags += (n & 0b10000111);      // ①②③⑧はそのまま
    return String.fromCodePoint(flags + 0x2800);
}
