// function outputUpdate(vol) {
// 	document.querySelector('#eduYearOut').value = vol;
// }

let lonnYear = 2020;
let B0;
let B1;
let B2;
let Bbio;
let Bforv;
let Bgeo;
let Bkjm;
let Bmat;
let Bbot;
let Bskog;
let Bhusd;
let xbio;
let xforv;
let xgeo;
let xkjm;
let xmat;
let xbot;
let xskog;
let xhusd;
let edY = 2000;
let edu;
let utd;
let salary;
let experience = lonnYear - edY;
var output2 = document.getElementById("exp");



output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";

function r1() {
    var rad2 = document.calcSector.sector;
    var prev2 = null;
    for (var i = 0; i < rad2.length; i++) {
        rad2[i].addEventListener('change', function () {
            (prev2) ? console.log("forrige verdi: " + prev2.value) : null;
            if (this !== prev2) {
                prev2 = this;
            }
            var sektor = this.value

            if (sektor == "privat") {
                B0 = -719187559.8803
                B1 = 728169.1983
                B2 = -184.1027
                Bbio = 17319.9796
                Bforv = 6939.7593
                Bgeo = 142068.4194
                Bkjm = 105495.5348
                Bmat = -5515.6457
                Bbot = -60831.3715
                Bskog = -38632.8333
                Bhusd = -60653.7865
            } else if (sektor == "stat") {
                B0 = -569365091.0101
                B1 = 575474.4390
                B2 = -145.2287
                Bbio = -11246.3845
                Bforv = -10108.5535
                Bgeo = 5243.5102
                Bkjm = 9031.0740
                Bmat = -49810.6803
                Bbot = -47561.4874
                Bskog = -8235.6129
                Bhusd = -18523.1286
            } else if (sektor == "kommune") {
                B0 = -374049466.2390
                B1 = 379437.5480
                B2 = -96.0375
                Bbio = -6322.7349
                Bforv = -7672.3669
                Bgeo = -5632.6569
                Bkjm = 15572.3016
                Bmat = -22646.6145
                Bbot = -22089.5250
                Bskog = -12716.9909
                Bhusd = -34277.7046
            }
            calculate();
        });
    }
    return;
}

function r2() {
    var rrad = document.getElementById("utdanning");
    var rad = rrad.value;
    let utd = rad;
    console.log("utd: " + utd)

    for (var i = 0; i < rad.length; i++) {
        rad.textContent = this.value;
        if (utd == "bio") {
            xbio = 1;
            xforv = 0;
            xgeo = 0;
            xkjm = 0;
            xmat = 0;
            xbot = 0;
            xskog = 0;
            xhusd = 0;
        } else if (utd == "forv") {
            xbio = 0;
            xforv = 1;
            xgeo = 0;
            xkjm = 0;
            xmat = 0;
            xbot = 0;
            xskog = 0;
            xhusd = 0;
        } else if (utd == "geo") {
            xbio = 0;
            xforv = 0;
            xgeo = 1;
            xkjm = 0;
            xmat = 0;
            xbot = 0;
            xskog = 0;
            xhusd = 0;
        } else if (utd == "kjm") {
            xbio = 0;
            xforv = 0;
            xgeo = 0;
            xkjm = 1;
            xmat = 0;
            xbot = 0;
            xskog = 0;
            xhusd = 0;
        } else if (utd == "mat") {
            xbio = 0;
            xforv = 0;
            xgeo = 0;
            xkjm = 0;
            xmat = 1;
            xbot = 0;
            xskog = 0;
            xhusd = 0;
        } else if (utd == "bot") {
            xbio = 0;
            xforv = 0;
            xgeo = 0;
            xkjm = 0;
            xmat = 0;
            xbot = 1;
            xskog = 0;
            xhusd = 0;
        } else if (utd == "skog") {
            xbio = 0;
            xforv = 0;
            xgeo = 0;
            xkjm = 0;
            xmat = 0;
            xbot = 0;
            xskog = 1;
            xhusd = 0;
        } else if (utd == "husd") {
            xbio = 0;
            xforv = 0;
            xgeo = 0;
            xkjm = 0;
            xmat = 0;
            xbot = 0;
            xskog = 0;
            xhusd = 1;
        } else if (utd == "andre") {
            xbio = 0;
            xforv = 0;
            xgeo = 0;
            xkjm = 0;
            xmat = 0;
            xbot = 0;
            xskog = 0;
            xhusd = 0;
        };

    }
    calculate();

    document.getElementById("utdanning").onchange = r2;
}




function slide() {
    var slider = document.getElementById("eduYear");
    var output = document.getElementById("demo");
    var output2 = document.getElementById("exp");

    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = this.value;
        edY = slider.value
        calculate();
        experience = lonnYear - edY;
        output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";
    }
    return;
}

var output3 = document.getElementById("salaryTitle");
var output4 = document.getElementById("lonnyear");
function calculate() {

    salary = Math.round(B0 + B1 * edY + B2 * edY ** 2 + Bbio * xbio + Bforv * xforv + Bgeo * xgeo + Bkjm * xkjm + Bmat * xmat + Bbot * xbot + Bskog * xskog + Bhusd * xhusd);
    if (isNaN(salary)) {
        document.getElementById('slr').innerHTML = ""
    } else {
        if (document.getElementById('slr') !== 0) {
            document.getElementById('slr').innerHTML = "kr " + Intl.NumberFormat('no-NB', { style: 'decimal' }).format(salary)
            output3.innerHTML = "Årslønn";
            output4.innerHTML = "Tall fra lønnsstatistikken " + lonnYear + " (minimum mastergrad)"
        }
        return salary;
    }
}





r1();
r2();
slide();
calculate();
