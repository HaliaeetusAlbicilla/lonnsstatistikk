// function outputUpdate(vol) {
// 	document.querySelector('#eduYearOut').value = vol;
// }

let lonnYear = 2020;
let B0;
let B1;
let B2;
let sectorValues = {
    'bio': 0,
    'forv': 0,
    'geo': 0,
    'kjm': 0,
    'mat': 0,
    'bot': 0,
    'skog': 0,
    'husd': 0,
}
let sectorSelected = {
    'bio': 0,
    'forv': 0,
    'geo': 0,
    'kjm': 0,
    'mat': 0,
    'bot': 0,
    'skog': 0,
    'husd': 0,
};

let edY = 2000;
let salary;
let experience = lonnYear - edY;
let output2 = document.getElementById("exp");



output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";

function r1() {
    let rad2 = document.calcSector.sector;
    let prev2 = null;
    for (let i = 0; i < rad2.length; i++) {
        rad2[i].addEventListener('change', function () {
            (prev2) ? console.log("forrige verdi: " + prev2.value) : null;
            if (this !== prev2) {
                prev2 = this;
            }
            let sektor = this.value

            if (sektor == "privat") {
                B0 = -719187559.8803
                B1 = 728169.1983
                B2 = -184.1027
                sectorValues = {
                    'bio': 17319.9796,
                    'forv': 6939.7593,
                    'geo': 142068.4194,
                    'kjm': 105495.5348,
                    'mat': -5515.6457,
                    'bot': -60831.3715,
                    'skog': -38632.8333,
                    'husd': -60653.7865,
                };
            } else if (sektor == "stat") {
                B0 = -569365091.0101
                B1 = 575474.4390
                B2 = -145.2287
                sectorValues = {
                    'bio': -11246.3845,
                    'forv': -10108.5535,
                    'geo': 5243.5102,
                    'kjm': 9031.0740,
                    'mat': -49810.6803,
                    'bot': -47561.4874,
                    'skog': -8235.6129,
                    'husd': -18523.1286,
                };
            } else if (sektor == "kommune") {
                B0 = -374049466.2390
                B1 = 379437.5480
                B2 = -96.0375
                sectorValues = {
                    'bio': -6322.7349,
                    'forv': -7672.3669,
                    'geo': -5632.6569,
                    'kjm': 15572.3016,
                    'mat': -22646.6145,
                    'bot': -22089.5250,
                    'skog': -12716.9909,
                    'husd': -34277.7046,
                };
            }
            calculate();
        });
    }
    return;
}

function r2() {
    let rrad = document.getElementById("utdanning");
    let rad = rrad.value;
    rad.textContent = this.value;
    let utd = rad;
    console.log("utd: " + utd);

    Object.keys(sectorSelected).forEach(key => { // Loop trough all keys
        sectorSelected[key] = (key === utd) ? 1 : 0; // Set the selected key to 1 and others to 0
    });

    calculate();

    document.getElementById("utdanning").onchange = r2;
}

function slide() {
    let slider = document.getElementById("eduYear");
    let output = document.getElementById("demo");
    let output2 = document.getElementById("exp");

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

let output3 = document.getElementById("salaryTitle");
let output4 = document.getElementById("lonnyear");
function calculate() {
    const keys = Object.keys(sectorValues);
    let partialResult = 0;
    keys.forEach((key, index) => {
        partialResult += (sectorValues[key] * sectorSelected[key]);
    });


    salary = Math.round(B0 + B1 * edY + B2 * edY ** 2 + partialResult);
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