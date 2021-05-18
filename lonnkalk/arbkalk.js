// function outputUpdate(vol) {
// 	document.querySelector('#eduYearOut').value = vol;
// }

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
let salary;
let experience = new Date().getFullYear() - edY;
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
                B0 = -665383837.6632
                B1 = 672987.4731
                B2 = -169.9672
                Bbio = 14829.5756
                Bforv = -16218.5374
                Bgeo = 209946.5927
                Bkjm = 111511.0381
                Bmat = -16761.6399
                Bbot = -39127.3359
                Bskog = -87233.5892
                Bhusd = -53792.8647
            } else if (sektor == "stat") {
                B0 = -563379096.3212
                B1 = 569058.6796
                B2 = -143.5191
                Bbio = -9523.6414
                Bforv = -14535.4733
                Bgeo = 5491.6788
                Bkjm = 10798.8112
                Bmat = -44223.5173
                Bbot = -39370.8951
                Bskog = -12442.4005
                Bhusd = -17914.0494
            } else if (sektor == "kommune") {
                B0 = -415779615.5535
                B1 = 420432.5333
                B2 = -106.1081
                Bbio = 4013.8608
                Bforv = 1845.7935
                Bgeo = 1287.0365
                Bkjm = 15321.7441
                Bmat = -868.0093
                Bbot = 5533.3200
                Bskog = -18278.4204
                Bhusd = -19092.4251
            }
            calculate();
        });
    }
    return;
}

function r2() {
    var rad = document.calcutd.utd;
    var prev = null;
    for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            (prev) ? console.log(prev.value) : null;
            if (this !== prev) {
                prev = this;
            }
            edu = this.value;
            if (edu == "bio") {
                xbio = 1;
                xforv = 0;
                xgeo = 0;
                xkjm = 0;
                xmat = 0;
                xbot = 0;
                xskog = 0;
                xhusd = 0;
            } else if (edu == "forv") {
                xbio = 0;
                xforv = 1;
                xgeo = 0;
                xkjm = 0;
                xmat = 0;
                xbot = 0;
                xskog = 0;
                xhusd = 0;
            } else if (edu == "geo") {
                xbio = 0;
                xforv = 0;
                xgeo = 1;
                xkjm = 0;
                xmat = 0;
                xbot = 0;
                xskog = 0;
                xhusd = 0;
            } else if (edu == "kjm") {
                xbio = 0;
                xforv = 0;
                xgeo = 0;
                xkjm = 1;
                xmat = 0;
                xbot = 0;
                xskog = 0;
                xhusd = 0;
            } else if (edu == "mat") {
                xbio = 0;
                xforv = 0;
                xgeo = 0;
                xkjm = 0;
                xmat = 1;
                xbot = 0;
                xskog = 0;
                xhusd = 0;
            } else if (edu == "bot") {
                xbio = 0;
                xforv = 0;
                xgeo = 0;
                xkjm = 0;
                xmat = 0;
                xbot = 1;
                xskog = 0;
                xhusd = 0;
            } else if (edu == "skog") {
                xbio = 0;
                xforv = 0;
                xgeo = 0;
                xkjm = 0;
                xmat = 0;
                xbot = 0;
                xskog = 1;
                xhusd = 0;
            } else if (edu == "husd") {
                xbio = 0;
                xforv = 0;
                xgeo = 0;
                xkjm = 0;
                xmat = 0;
                xbot = 0;
                xskog = 0;
                xhusd = 1;
            } else if (edu == "andre") {
                xbio = 0;
                xforv = 0;
                xgeo = 0;
                xkjm = 0;
                xmat = 0;
                xbot = 0;
                xskog = 0;
                xhusd = 0;
            };
            calculate();
        });
    }
    return;
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
        experience = new Date().getFullYear() - edY;
        output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";
    }
    return;
}

var output3 = document.getElementById("salaryTitle");
function calculate() {
    salary = Math.round(B0 + B1 * edY + B2 * edY ** 2 + Bbio * xbio + Bforv * xforv + Bgeo * xgeo + Bkjm * xkjm + Bmat * xmat + Bbot * xbot + Bskog + xskog + Bhusd * xhusd);
    if (isNaN(salary)) {
        document.getElementById('slr').innerHTML = ""
    } else {
        if (document.getElementById('slr') !== 0) {
            document.getElementById('slr').innerHTML = "kr " + Intl.NumberFormat('no-NB', { style: 'decimal' }).format(salary)
            output3.innerHTML = "Årslønn";
        }
        return salary;
    }
}




r1();
r2();
slide();
calculate();
