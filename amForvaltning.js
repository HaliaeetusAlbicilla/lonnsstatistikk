document.addEventListener('DOMContentLoaded', function () {
    let scatterData = fetch('/arbForvaltning')

    Promise.all([scatterData])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
            let scatter = data[0]

            const alle = scatter.map(res => [res.Eksamensår, res.Årslønn])

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
                    renderTo: 'container3'
                    // renderTo: 'container-fluid',
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
                    max: 1000000,
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


            optionsSC.series.push({
                regression: true,
                regressionSettings: {
                    type: 'polynomial',
                    color: 'black',
                    lineWidth: 3,
                },
                name: 'Medlem',
                color: '#94c43a',
                data: alle,
            });



            let chart = new Highcharts.Chart(optionsSC);
        });
});