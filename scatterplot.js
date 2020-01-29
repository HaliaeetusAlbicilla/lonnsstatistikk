document.addEventListener('DOMContentLoaded', function () {
    let medianData = fetch('/set1');
    let gjData = fetch('/set2')
    let scatterData = fetch('/set3')
    let gjEksData = fetch('/set4')
    Promise.all([scatterData, gjEksData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
            let scatter = data[0]
            let gjEks = data[1]
            console.log("DATA1: ", data[1]);

            const mann = scatter.filter(function (item) {
                return item.Kjønn === "Mann";
            }).map(res => [res.Eksamensår, res.Årslønn]);

            const gjmann = gjEks.filter(function (item) {
                return item.Kjønn === "Mann";
            }).map(res => [res.Eksamensår, res.Gjennomsnitt, res.Kjønn]);

            const kvinne = scatter.filter(function (item) {
                return item.Kjønn === "Kvinne";
            }).map(res => [res.Eksamensår, res.Årslønn]);
            console.log(mann);

            const gjkvinne = gjEks.filter(function (item) {
                return item.Kjønn === "Kvinne";
            }).map(res => [res.Eksamensår, res.Gjennomsnitt, res.Kjønn]);
            console.log("GJKVINNE: ", gjkvinne)

            const gjEksMap = gjEks.map(res => [res.Eksamensår, res.Gjennomsnitt, res.Kjønn]);
            console.log("GJEKSMAP", gjEksMap)

            const alle = scatter.map(res => [res.Eksamensår, res.Årslønn])
            console.log("ALLE: ", alle)

            //Tallformatering
            function formatNO(num) {
                return (
                    num
                        .toFixed(0) // ingen desimaltall
                        .replace('.', ',') // bytt ut . med komma i desimaltall ,
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                ) // bruk . som separator
            }

            let optionsSC = {

                chart: {
                    type: 'scatter',
                    renderTo: 'container3',
                },

                lang: {
                    numericSymbols: null
                },

                title: {
                    text: 'Lønn etter eksamensår'
                },
                xAxis: {

                    title: {
                        text: 'Eksamensår'
                    }
                },
                lang: {
                    numericSymbols: null
                },

                tooltip: {
                    formatter: function () {
                        return 'Eksamensår:' + this.x + ', Årslønn: ' + formatNO(this.y) + ' kroner';
                    }
                },
                yAxis: {
                    min: 400000,
                    max: 1200000,
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


            // optionsSC.series.push({
            //     name: 'Lønn',
            //     data: alle,
            //     color: '#92bfd5',
            //     opacity: '0.9',
            //     id: 'primary',
            //     enableMouseTracking: false,
            //     states: {
            //         inactive: {
            //             opacity: 0.5
            //         }
            //     }
            // });

            // optionsSC.series.push({
            //     name: 'Kvinner',
            //     data: kvinne,
            //     color: '#92bfd5',
            //     opacity: '0.9',
            //     id: 'primary',
            //     enableMouseTracking: false,
            //     states: {
            //         inactive: {
            //             opacity: 0.5
            //         }
            //     }
            // });

            // optionsSC.series.push({
            //     name: 'Menn',
            //     data: mann,
            //     color: '#94c43a',
            //     opacity: '0.9',
            //     enableMouseTracking: false,
            //     states: {
            //         inactive: {
            //             opacity: 0.5
            //         }
            //     }
            // })

            // optionsSC.series.push({
            //     type: 'line',
            //     name: 'Gjennomsnitt kvinner',
            //     data: gjkvinne,
            //     color: '#92bfd5',
            //     lineWidth: 3,
            //     // marker: {
            //     //     enabled: false
            //     // }
            // });

            // optionsSC.series.push({
            //     type: 'line',
            //     name: 'Gjennomsnitt menn',
            //     data: gjmann,
            //     color: '#94c43a',
            //     lineWidth: 3,
            // });

            // optionsSC.series.push({
            //     type: 'line',
            //     name: 'Gjennomsnitt',
            //     data: gjEksMap,
            //     color: 'grey',
            //     lineWidth: 5,
            // });

            optionsSC.series.push({
                regression: true,
                regressionSettings: {
                    type: 'polynomial',
                    color: 'black',
                },
                name: 'Medlem',
                color: '#94c43a',
                data: alle,
            });



            let chart = new Highcharts.Chart(optionsSC);
        });
});