function getRes() {

    // Selecting the input element and get its value 

    var brukerLonn = document.getElementById("minLonn").value;
    var brukerPerm = document.getElementById("permProsent").value;
    var G = 99858
    if (brukerPerm < 40) {
        var aarsUtbet = 0
    } else {
        if (brukerLonn < 0.75 * G) {
            var aarsUtbet = 0
        } else if (brukerLonn >= 0.75 * G && brukerLonn < 3 * G) {
            var aarsUtbet = Math.round(brukerLonn * 0.8 * brukerPerm / 100)
        } else if (brukerLonn >= 3 * G && brukerLonn < 6 * G) {
            var aarsUtbet = Math.round(((brukerLonn - 3 * G) * 0.624 + 3 * G * 0.8) * brukerPerm / 100)
        } else if (brukerLonn >= 6 * G) {
            var aarsUtbet = Math.round(426593 * brukerPerm / 100)
        }

    }
    var toUkers = Math.round(aarsUtbet / 26);
    // alert(aarsUtbet);
    // alert(toUkers);
    document.getElementById("aar").innerHTML = "<strong>Din årlige utbetaling før skatt:</strong> <br />" + aarsUtbet + " kr";
    document.getElementById("toUke").innerHTML = "<strong>Din utbetaling hver 14. dag før skatt:</strong> <br />" + toUkers + " kr";
    // return [aarsUtbet(), toUkers()];
}




