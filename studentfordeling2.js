document.addEventListener('DOMContentLoaded', function () {
    let studentData2 = fetch('/studentfordeling2')

    Promise.all([studentData2])
        .then((res) => Promise.all(res.map(res => res.json())))
        .then((data) => {
      
            let stud = data[0]
            const studentdata2 = stud.map(res => [res.utdanningsretning, res.ant])

            //Tallformatering
            function formatNO(num) {
                return (
                    num
                        .toFixed(0) // ingen desimaltall
                        .replace('.', ',') // bytt ut . med komma i desimaltall ,
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                ) // bruk . som separator
            }


            let optionsST = {

                chart: {
                    type: 'pie',
                    renderTo: 'studentcontainer2',
                },

                lang: {
                    numericSymbols: null
                },

                credits: {
                    enabled: false
                },

                title: {
                    text: 'Fordelingen av studentmedlemmer i Naturviterne'
                },
                xAxis: {

                    title: {
                        text: 'Antall'
                    }
                },
                lang: {
                    numericSymbols: null
                },

                tooltip: {
                    formatter: function () {
                        return 'Antall: ' + formatNO(this.y) + ' medlemmer';
                    }
                },

                series: []
            };


        
            optionsST.series.push({
                regression: true,
                regressionSettings: {
                    type: 'polynomial',
                    color: 'black',
                    lineWidth: 3,
                },
                name: 'Medlem',
                color: '#94c43a',
                data: studentdata2,
            });

let chart = new Highcharts.Chart(optionsST);
        });
});






