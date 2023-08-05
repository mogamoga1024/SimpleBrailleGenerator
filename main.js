
const allBraille = "⠀⠁⠂⠃⠄⠅⠆⠇⡀⡁⡂⡃⡄⡅⡆⡇⠈⠉⠊⠋⠌⠍⠎⠏⡈⡉⡊⡋⡌⡍⡎⡏⠐⠑⠒⠓⠔⠕⠖⠗⡐⡑⡒⡓⡔⡕⡖⡗⠘⠙⠚⠛⠜⠝⠞⠟⡘⡙⡚⡛⡜⡝⡞⡟⠠⠡⠢⠣⠤⠥⠦⠧⡠⡡⡢⡣⡤⡥⡦⡧⠨⠩⠪⠫⠬⠭⠮⠯⡨⡩⡪⡫⡬⡭⡮⡯⠰⠱⠲⠳⠴⠵⠶⠷⡰⡱⡲⡳⡴⡵⡶⡷⠸⠹⠺⠻⠼⠽⠾⠿⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⣀⣁⣂⣃⣄⣅⣆⣇⢈⢉⢊⢋⢌⢍⢎⢏⣈⣉⣊⣋⣌⣍⣎⣏⢐⢑⢒⢓⢔⢕⢖⢗⣐⣑⣒⣓⣔⣕⣖⣗⢘⢙⢚⢛⢜⢝⢞⢟⣘⣙⣚⣛⣜⣝⣞⣟⢠⢡⢢⢣⢤⢥⢦⢧⣠⣡⣢⣣⣤⣥⣦⣧⢨⢩⢪⢫⢬⢭⢮⢯⣨⣩⣪⣫⣬⣭⣮⣯⢰⢱⢲⢳⢴⢵⢶⢷⣰⣱⣲⣳⣴⣵⣶⣷⢸⢹⢺⢻⢼⢽⢾⢿⣸⣹⣺⣻⣼⣽⣾⣿";

// 右下から右上までの四点 & 左下から左上までの四点
let pointsBinaryNumber = 0b00000000;
const $point = $(".point");
const $result = $("#result");

$point.click(function() {
    const $this = $(this);
    const shiftCount = $this.data("shift-count");
    if ($this.hasClass("black")) {
        $this.removeClass("black");
        pointsBinaryNumber = pointsBinaryNumber - (1 << shiftCount)
    }
    else {
        $this.addClass("black");
        pointsBinaryNumber = pointsBinaryNumber + (1 << shiftCount)
    }
    $result.text(numToBrailleLetter(pointsBinaryNumber));
});

$("#copy").click(function() {
    navigator.clipboard.writeText($result.text());
});

$("#clear").click(function() {
    $point.each(function() {
        $(this).removeClass("black");
    });
    pointsBinaryNumber = 0b00000000;
    $result.text(numToBrailleLetter(pointsBinaryNumber));
});

$(window).on("paste", function() {
    navigator.clipboard.readText().then(text => {
        if (!isBraille(text)) {
            return;
        }
        pointsBinaryNumber = brailleLetterToNum(text);
        $result.text(numToBrailleLetter(pointsBinaryNumber));

        $point.each(function() {
            const $this = $(this);
            const shiftCount = $this.data("shift-count");
            const needPoint = (pointsBinaryNumber & (0b00000001 << shiftCount)) !== 0;
            if (needPoint) {
                $this.addClass("black");
            }
            else {
                $this.removeClass("black");
            }
        });
    });
});

function isBraille(text) {
    if (text.length !== 1) {
        return false;
    }
    return allBraille.includes(text);
}

// 参考元: https://qiita.com/zakuroishikuro/items/15d1a69178895edf9a21
function numToBrailleLetter(n) {
    let flags = 0;
    flags += (n & 0b00001000) << 3; // ⑦を左シフト
    flags += (n & 0b01110000) >> 1; // ④⑤⑥を右シフト
    flags += (n & 0b10000111);      // ①②③⑧はそのまま
    return String.fromCodePoint(flags + 0x2800);
}

function brailleLetterToNum(c){
    const u = c.codePointAt(0);
    let flags = 0;
    flags += (u & 0b01000000) >> 3;
    flags += (u & 0b00111000) << 1;
    flags += (u & 0b10000111);
    return flags;
}


