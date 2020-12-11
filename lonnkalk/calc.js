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
                B0 = -661139792.5719
                B1 = 667074.9374
                B2 = -168.1276
                Bbachelor = 150137.2600 
                Bmaster = 214687.9924
                Bdoc = 238412.9508    
            } else if (sektor == "stat"){
                B0 = -589639990.5165
                B1 = 594523.5227
                B2 = -149.7158 
                Bbachelor = 20439.8255 
                Bmaster = 153596.9459 
                Bdoc = 118066.6491
            } else if (sektor == "kommune"){
                B0 = -290069319.8967
                B1 = 294277.5442
                B2 = -74.5054
                Bbachelor = 150956.3413
                Bmaster = 191694.3120
                Bdoc = 232952.2083
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
            (prev) ? console.log("forrige verdi: " + prev.value): null;
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
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
        edY = slider.value
        calculate();
    }
    return;
}

function calculate(){
    salary = Math.round(B0 + B1 * edY + B2 * edY **2 + Bbachelor * xBachelor + Bmaster * xMaster + Bdoc * xDoc);
if (isNaN(salary)){
    document.getElementById('slr').innerHTML = ""
} else {
    if (document.getElementById('slr') !== 0) {
        document.getElementById('slr').innerHTML = salary + " kr/år"
    }
    return salary;
}
}

r1();
r2();
slide();
calculate();