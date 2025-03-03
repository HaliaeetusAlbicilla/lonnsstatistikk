// function outputUpdate(vol) {
// 	document.querySelector('#eduYearOut').value = vol;
// }

let statYear = 2024
let B0;
let B1;
let B2;
let Bbachelor;
let Bmaster;
let Bdoc;
let xBachelor;
let xMaster;
let xDoc;
let edY = 2000;
let edu;
let salary;
let experience = statYear - edY;
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
                B0 = -895964708.6813
                B1 = 901920.1182
                B2 = -226.7828
                Bbachelor = 39536.8771
                Bmaster = 120347.1757
                Bdoc = 217855.1294
            } else if (sektor == "stat") {
                B0 = -375887985.2393
                B1 = 381896.1012
                B2 = -96.7968
                Bbachelor = 5054.1822
                Bmaster = 50490.7635
                Bdoc = 98041.0485
            } else if (sektor == "kommune") {
                B0 = -646725056.2273
                B1 = 650838.5591
                B2 = -163.5597
                Bbachelor = 41595.0975
                Bmaster = 111476.8897
                Bdoc = 142265.2765
            }
            calculate();
        });
    }
    return;
}

function r2() {
    var rad = document.calcEdu.eduMax;
    var prev = null;
    for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            (prev) ? console.log(prev.value) : null;
            if (this !== prev) {
                prev = this;
            }
            edu = this.value;
            if (edu == "bachelor") {
                xBachelor = 1;
                xMaster = 0;
                xDoc = 0;
            } else if (edu == "master") {
                xBachelor = 0;
                xMaster = 1;
                xDoc = 0;
            } else if (edu == "doc") {
                xBachelor = 0;
                xMaster = 0;
                xDoc = 1;
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
        experience = statYear - edY;
        output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";
    }
    return;
}

var output3 = document.getElementById("salaryTitle");
function calculate() {
    salary = Math.round(B0 + B1 * edY + B2 * edY ** 2 + Bbachelor * xBachelor + Bmaster * xMaster + Bdoc * xDoc);
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
