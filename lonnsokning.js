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

            let optionsMD = {
                chart: {
                    type: 'column',
                    renderTo: 'container',
                },
                title: {
                    text: 'Lønnsvekst etter sektor, 2013 - 2019'
                },
                xAxis: {
                    type: 'category',
                    categories: [
                        '2013',
                        '2014',
                        '2015',
                        '2016',
                        '2017',
                        '2018',
                        '2019'
                    ]

                },
                tooltip: {
                    formatter: function () {
                        return this.series.name + ': ' + this.y + ' %</b>';
                    }
                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Lønnsvekst (%)'
                    }
                },
                series: []
            };

            optionsMD.series.push({
                name: 'Kommune',
                data: [3.2, 4.3, 1.7, 4.3, 3.7, 2.9, 1.0],
                color: '#92bfd5',
            })

            optionsMD.series.push({
                name: 'Stat',
                data: [1.6, 4.0, 1.1, 3.7, 1.6, 3.5, 1.0],
                color: '#94c43a',
            })

            optionsMD.series.push({
                name: 'Privat',
                data: [2.1, 3.7, 1.9, 3.2, 2.8, 5.4, 1.0],
                color: '#F59E00',
            })


            let chart2 = new Highcharts.Chart(optionsMD);
        });
});
