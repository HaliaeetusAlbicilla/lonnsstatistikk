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
                        return 'Eksamensår:' + this.x + ', Årslønn: ' + Math.round(this.y) + ' kroner';
                    }
                },
                yAxis: {
                    min: 400000,
                    max: 1200000,
                    title: {
                        text: 'Årslønn'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },

                series: []
            };


            optionsSC.series.push({
                name: 'Kvinner',
                data: kvinne,
                color: '#92bfd5',
                opacity: '0.9',
                states: {
                    inactive: {
                        opacity: 0.1
                    }
                }
            })

            optionsSC.series.push({
                name: 'Menn',
                data: mann,
                color: '#94c43a',
                opacity: '0.9',
                states: {
                    inactive: {
                        opacity: 0.1
                    }
                }
            })

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

            optionsSC.series.push({
                type: 'line',
                name: 'Gjennomsnitt',
                data: gjEksMap,
                color: 'grey',
                lineWidth: 5,
            });

            let chart = new Highcharts.Chart(optionsSC);
        });
});