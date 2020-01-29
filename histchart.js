document.addEventListener('DOMContentLoaded', function () {
    let medianData = fetch('/set1');
    let gjData = fetch('/set2')
    Promise.all([medianData, gjData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
            let mean = data[0];
            let median = data[1];
            console.log("MEDIAN: ", median)
            console.log("GJENNOMSNITT:", mean)
            // let output = '<h2>Median</h2>'

            // let output = '<h2>Gjennomsnitt</h2>'

            const privatMD = median.find(element => element["Sektor"] === 'Privat');
            const statMD = median.find(element => element["Sektor"] === 'Stat');
            const kommuneMD = median.find(element => element["Sektor"] === 'Kommune');
            const alleMD = median.find(element => element["Sektor"] === 'Alle');
            const privatGJ = mean.find(element => element["Sektor"] === 'Privat');
            const statGJ = mean.find(element => element["Sektor"] === 'Stat');
            const kommuneGJ = mean.find(element => element["Sektor"] === 'Kommune');
            const alleGJ = mean.find(element => element["Sektor"] === 'Alle');

            //Tallformatering
            function formatNO(num) {
                return (
                    num
                        .toFixed(0) // ingen desimaltall
                        .replace('.', ',') // bytt ut . med komma i desimaltall ,
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                ) // bruk . som separator
            }


            let optionsGJ = {
                chart: {
                    renderTo: 'container',
                },
                title: {
                    text: 'Historisk lønnsutvikling etter sektor'
                },
                xAxis: {
                    categories: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
                    title: {
                        text: 'År'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return 'Gjennomsnitt for ' + this.x + ' i sektor ' + this.point.series.name.toLowerCase() + ': ' + formatNO(this.y) + ' kroner';
                    }
                },
                yAxis: {
                    title: {
                        text: 'Gjennomsnittlig årslønn (NOK)'
                    },
                    labels: {
                        formatter: function () {
                            return formatNO(this.value);
                        }
                    }

                },
                series: []
            };


            optionsGJ.series.push({
                name: 'Kommune',
                data: [506000, 522000, 544000, 553000, 576000, 596000, 613846, kommuneGJ['Gjennomsnittslønn']],
                color: '#92bfd5',
            })

            optionsGJ.series.push({
                name: 'Stat',
                data: [522000, 530000, 551000, 556000, 576000, 585000, 605455, statGJ['Gjennomsnittslønn']],
                color: '#94c43a',
            })

            optionsGJ.series.push({
                name: 'Privat',
                data: [544000, 556000, 576000, 587000, 605000, 621000, 655355, privatGJ['Gjennomsnittslønn']],
                color: '#F59E00',
            })

            let chart = new Highcharts.Chart(optionsGJ);
        });
});