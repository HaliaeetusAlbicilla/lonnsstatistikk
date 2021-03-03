// function outputUpdate(vol) {
// 	document.querySelector('#eduYearOut').value = vol;
// }

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
let experience = new Date().getFullYear() - edY;
var output2 = document.getElementById("exp");
output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";

function r1(){
    var rad2 = document.calcSector.sector;
    var prev2 = null;
    for (var i = 0; i < rad2.length; i++) {
        rad2[i].addEventListener('change', function() {
            (prev2) ? console.log("forrige verdi: " + prev2.value): null;
            if (this !== prev2) {
                prev2 = this;
            }
            var sektor = this.value
        
            if (sektor == "privat"){
                B0 = -584122662.1409
                B1 = 591302.8601
                B2 = -149.4791
                Bbachelor = 68299.0851
                Bmaster = 149310.4146
                Bdoc = 221192.4692   
            } else if (sektor == "stat"){
                B0 = -569028265.8032
                B1 = 574942.6049
                B2 = -145.0700
                Bbachelor = 25687.7259
                Bmaster = 76482.3291
                Bdoc = 110640.6253
            } else if (sektor == "kommune"){
                B0 = -399453647.2230
                B1 = 404304.9564
                B2 = -102.1512
                Bbachelor = 58257.2682
                Bmaster = 117503.2231
                Bdoc = 131148.1466
            }
            calculate(); 
        });
    }
    return;
}

function r2(){
    var rad = document.calcEdu.eduMax;
    var prev = null;
    for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function() {
            (prev) ? console.log(prev.value): null;
            if (this !== prev){
                prev = this;
            }
            edu = this.value;
            if (edu == "bachelor"){
                xBachelor = 1;
                xMaster = 0;
                xDoc = 0;
            } else if (edu == "master"){
                xBachelor = 0;
                xMaster = 1;
                xDoc = 0;
            } else if (edu == "doc"){
                xBachelor = 0;
                xMaster = 0;
                xDoc = 1;
            };
            calculate(); 
        });
    }
    return;
}

function slide(){
    var slider = document.getElementById("eduYear");
    var output = document.getElementById("demo");
    var output2 = document.getElementById("exp");
    
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        edY = slider.value
        calculate();
        experience = new Date().getFullYear() - edY;
        output2.innerHTML = "(Typisk rundt " + experience + " års arbeidserfaring)";
    }
    return;
}

var output3 = document.getElementById("salaryTitle");
function calculate(){
    salary = Math.round(B0 + B1 * edY + B2 * edY **2 + Bbachelor * xBachelor + Bmaster * xMaster + Bdoc * xDoc);
if (isNaN(salary)){
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
