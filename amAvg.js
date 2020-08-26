
document.addEventListener('DOMContentLoaded', function () {

    let gjData = fetch('/arbAvg')

    Promise.all([gjData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {

            let gjd = data[0]
            const alle = gjd.map(res => [res.Utdanningsretning, res.Gjennomsnitt, res.gjEksamensår])
            const gj = gjd.map(res => [res.Gjennomsnitt])
            const eks = gjd.map(res => [res.gjEksamensår])

            function kr(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }

            // console.log(gjd)
            const biologiAvgL = kr(gj[3])
            const biologiAvgE = eks[3]

            const forvaltningAvgL = kr(gj[0])
            const forvaltningAvgE = eks[0]

            const husdyrAvgL = kr(gj[8])
            const husdyrAvgE = eks[8]

            const matAvgL = kr(gj[9])
            const matAvgE = eks[9]

            const planteAvgL = kr(gj[15])
            const planteAvgE = eks[15]
            const hageAvgL = kr(gj[17])
            const hageAvgE = eks[17]

            const skogAvgL = kr(gj[1])
            const skogAvgE = eks[1]

            // const teknAvgL = kr(gj[])
            // const teknAvgE = eks[]

            const geoAvgL = kr(gj[13])
            const geoAvgE = eks[13]
            const geogAvgL = kr(gj[6])
            const geogAvgE = eks[6]

            if (document.getElementById('forvaltningAvgLonn') !== null) {
                document.getElementById('forvaltningAvgLonn').innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning i denne kategorien var " + forvaltningAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + forvaltningAvgE + " i gjennomsnitt."
            }

            if (document.getElementById('bioAvgLonn') !== null) {
                document.getElementById("bioAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning i denne kategorien var " + biologiAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + biologiAvgE + " i gjennomsnitt."
            }

            if (document.getElementById('husdyrAvgLonn') !== null) {
                document.getElementById("husdyrAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning i denne kategorien var " + husdyrAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + husdyrAvgE + " i gjennomsnitt."
            }

            if (document.getElementById('matAvgLonn') !== null) {
                document.getElementById("matAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning i denne kategorien var " + matAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + matAvgE + " i gjennomsnitt."
            }

            if (document.getElementById('planteAvgLonn') !== null) {
                document.getElementById("planteAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning innen plantefag var " + planteAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + planteAvgE + " i gjennomsnitt. Tilsvarende tall for hagebruk var " + hageAvgL + " kroner for gjennomsnittlig gjennomført utdanning i " + hageAvgE + "."
            }

            if (document.getElementById('skogAvgLonn') !== null) {
                document.getElementById("skogAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning i denne kategorien var " + skogAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + skogAvgE + " i gjennomsnitt."
            }

            if (document.getElementById('teknAvgLonn') !== null) {
                document.getElementById("teknAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning i denne kategorien var " + teknAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + teknAvgE + " i gjennomsnitt."
            }

            if (document.getElementById('geoAvgLonn') !== null) {
                document.getElementById("geoAvgLonn").innerHTML = "Gjennomsnittlig årslønn for våre medlemmer med utdanning innen geologifagene var " + geoAvgL + " kroner. Utvalget gjennomførte utdanningen sin i " + geoAvgE + " i gjennomsnitt. Tilsvarende tall for geografi var " + geogAvgL + " kroner for gjennomsnittlig gjennomført utdanning i " + geogAvgE + "."
            }


        });

});





