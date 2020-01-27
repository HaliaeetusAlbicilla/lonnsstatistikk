document.addEventListener('DOMContentLoaded', function () {
    let medianData = fetch('/set1');
    let gjData = fetch('/set2')
    let scatterData = fetch('/set3')
    Promise.all([medianData, gjData, scatterData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
            let mean = data[0];
            let median = data[1];
            let scatter = data[2]
            
            const mann = data.filter(function (item) {
                return item.Kjønn === "Mann";
            }).map(res => [res.Eksamensår, res.Årslønn]);

            const kvinne = data.filter(function (item) {
                return item.Kjønn === "Kvinne";
            }).map(res => [res.Eksamensår, res.Årslønn]);

            console.log("KVINNER: ", kvinne);
            console.log("MENN: ", mann);
            console.log("DATA: ", data)
            console.log("SCATTER", scatter)
            let optionsSC = {
                chart: {
                    type: 'scatter', 
                    renderTo: 'container3',
                },
                title: {
                    text: 'Lønn etter eksamensår'
                },
                xAxis: {
                    
                    title: {
                        text: 'Eksamensår'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return 'Gjennomsnitt for ' + this.x + ' i sektor ' + this.point.series.name.toLowerCase() + ': ' + Math.round(this.y) + ' kroner';
                    }
                },
                yAxis: {
                    title: {
                        text: 'Årslønn'
                    }
                },

                series: [{
                    name: 'Kvinne',
                    data: kvinne
                }, {
                    name: 'Mann',
                    data: mann
                }]
            };

         

            //     series: {
            //         name: 'Kvinne',
            //         color: 'rgba(223, 83, 83, .5)',
            //         data: kvinne['Årslønn']
            //     }, {
            //         name: 'Mann',
            //         color: 'rgba(119, 152, 191, .5)',
            //         data: mann['Årslønn']
            //     }
            // };

            let chart = new Highcharts.Chart(optionsSC);
    });
});