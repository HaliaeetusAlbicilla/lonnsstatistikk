document.addEventListener('DOMContentLoaded', function () {
    let medianData = fetch('/set1');
    let gjData = fetch('/set2')
    Promise.all([medianData, gjData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
            let mean = data[0];
            let median = data[1];

            const privatMD = median.find(element => element["Sektor"] === 'Privat');
            const statMD = median.find(element => element["Sektor"] === 'Stat');
            const kommuneMD = median.find(element => element["Sektor"] === 'Kommune');
            const alleMD = median.find(element => element["Sektor"] === 'Alle');
            const privatGJ = mean.find(element => element["Sektor"] === 'Privat');
            const statGJ = mean.find(element => element["Sektor"] === 'Stat');
            const kommuneGJ = mean.find(element => element["Sektor"] === 'Kommune');
            const alleGJ = mean.find(element => element["Sektor"] === 'Alle');

            //tallformaterer
            function formatNO(num) {
                return (
                    num
                        .toFixed(0) // ingen desimaltall
                        .replace('.', ',') // bytt ut . med komma i desimaltall ,
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                ) // bruk . som separator
            }

            let optionsMD = {
                chart: {
                    type: 'column',
                    renderTo: 'container2',
                },
                title: {
                    text: 'Gjennomsnitt og median etter sektor'
                },
                xAxis: {
                    type: 'category',
                    categories: [
                        'Kommune',
                        'Stat',
                        'Privat',
                        'Alle'
                    ]

                },
                tooltip: {
                    formatter: function () {
                        return this.series.name + ': ' + formatNO(this.y) + ' kroner</b>';
                    }
                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Årslønn (NOK)'
                    },
                    labels: {
                        formatter: function () {
                            return formatNO(this.value);
                        }
                    }
                },
                series: []
            };

            optionsMD.series.push({
                name: 'Gjennomsnittslønn',
                data: [kommuneGJ['Gjennomsnittslønn'], statGJ['Gjennomsnittslønn'], privatGJ['Gjennomsnittslønn'], alleMD['Gjennomsnittslønn']],
                color: '#6E6B05',
            })

            optionsMD.series.push({
                name: 'Medianlønn',
                data: [kommuneMD['Medianlønn'], statMD['Medianlønn'], privatMD['Medianlønn'], alleMD['Medianlønn']],
                color: '#92bfd5',
            })


            let chart2 = new Highcharts.Chart(optionsMD);
        });
});
