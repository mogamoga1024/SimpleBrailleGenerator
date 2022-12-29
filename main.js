
// 右上から右下までの四点 & 左上から左下までの四点
const pointsBinaryNumber = 0b00000100;
const $result = $("#result");

$(".point").click(function() {
    $(this).toggleClass("black");

    $result.text(numToBrailleLetter(pointsBinaryNumber));
});

// 参考元: https://qiita.com/zakuroishikuro/items/15d1a69178895edf9a21
function numToBrailleLetter(n) {
    let flags = 0;
    flags += (n & 0b00001000) << 3; // ⑦を左シフト
    flags += (n & 0b01110000) >> 1; // ④⑤⑥を右シフト
    flags += (n & 0b10000111);      // ①②③⑧はそのまま
    return String.fromCodePoint(flags + 0x2800);
}
