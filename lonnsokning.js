document.addEventListener('DOMContentLoaded', function () {
    let gjData = fetch('/set1')
    let medianData = fetch('/set2')
    Promise.all([gjData], [medianData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
            let mean = data[0];

            const privatGJ = mean.find(element => element["Sektor"] === 'Privat');
            const statGJ = mean.find(element => element["Sektor"] === 'Stat');
            const kommuneGJ = mean.find(element => element["Sektor"] === 'Kommune');
            const alleGJ = mean.find(element => element["Sektor"] === 'Alle');

            //Regner ut prosent vekst fra 2018. 
            //Tallene fra 2018 burde vel egentlig defineres et annet sted

            let kommunediff = kommuneGJ["Gjennomsnittslønn"] - 613846;
            let kommuneforhold = kommunediff / 613846
            const kommunevekst = kommuneforhold * 100

            let statdiff = statGJ["Gjennomsnittslønn"] - 605455;
            let statforhold = statdiff / 605455
            const statvekst = statforhold * 100

            let privdiff = privatGJ["Gjennomsnittslønn"] - 655355;
            let privforhold = privdiff / 655355
            const privvekst = privforhold * 100


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
                        return this.series.name + ': ' + this.y.toFixed(1) + ' %</b>';

                    },
                    valueDecimals: 2,
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
                data: [3.2, 4.3, 1.7, 4.3, 3.7, 2.9, kommunevekst],
                color: '#92bfd5',
            })

            optionsMD.series.push({
                name: 'Stat',
                data: [1.6, 4.0, 1.1, 3.7, 1.6, 3.5, statvekst],
                color: '#94c43a',
            })

            optionsMD.series.push({
                name: 'Privat',
                data: [2.1, 3.7, 1.9, 3.2, 2.8, 5.4, privvekst],
                color: '#F59E00',
            })


            let chart2 = new Highcharts.Chart(optionsMD);
        });
});
