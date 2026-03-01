// Lønnskalkulator 2025 - Auto-generated from sal25_14_calculator_coefficients.ipynb

let statYear = 2025
let B0;
let B1;
let B2;
let edY = 2000;
let edu;
let salary;
let experience = statYear - edY;
var output2 = document.getElementById("exp");
output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";

function r1() {
    var rad2 = document.calcTariff.tariff;
    var prev2 = null;
    for (var i = 0; i < rad2.length; i++) {
        rad2[i].addEventListener('change', function () {
            (prev2) ? console.log("forrige verdi: " + prev2.value) : null;
            if (this !== prev2) {
                prev2 = this;
            }
            var tariff = this.value

            if (tariff == "stat") {
                B0 = -726745478.19666
                B1 = 732313.93818
                B2 = -184.26084
            } else if (tariff == "kommune_ks") {
                B0 = -841121134.62797
                B1 = 844393.60874
                B2 = -211.70783
            } else if (tariff == "privat_nho") {
                B0 = -1283233480.05341
                B1 = 1286871.94494
                B2 = -322.41293
            } else if (tariff == "privat_itb") {
                B0 = -1336345948.36135
                B1 = 1344702.70448
                B2 = -338.01645
            } else if (tariff == "privat_spekter_san") {
                B0 = -619008398.44159
                B1 = 624173.75850
                B2 = -157.12532
            } else if (tariff == "privat_nho_abelia") {
                B0 = -666545335.48863
                B1 = 678078.69963
                B2 = -172.15424
            } else if (tariff == "oslo_kommune") {
                B0 = -1710234553.74867
                B1 = 1710932.21388
                B2 = -427.67339
            } else if (tariff == "privat_virke") {
                B0 = 1184473436.64711
                B1 = -1172723.15534
                B2 = 290.43512
            } else if (tariff == "kommune_ks_fjellstyrene") {
                B0 = -526006587.62924
                B1 = 526477.08963
                B2 = -131.54841
            }
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
    salary = Math.round(B0 + B1 * edY + B2 * edY ** 2);
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
slide();
calculate();