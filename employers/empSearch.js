document.getElementById('search').addEventListener('click', (event) => {
    getEmps().then(emps => {
        console.log("employer: " + empName());

        var listDiv = document.getElementById('empList');
        var ul=document.createElement('ul');
        document.getElementById('empList').innerHTML = ""
        for (var i = 0; i < emps.enheter.length; ++i) {
            // var li=document.createElement('li');
            // li.innerHTML = emps.enheter[i].navn;   // Use innerHTML to set the text
            // ul.appendChild(li);

            const btn = document.createElement("button");
            btn.id = "btnItems";
            btn.textContent = emps.enheter[i].navn;
          
            btn.onclick = function(el) {
                // disable your button immediately upon click
                el.target.disabled = true;
                // save value somehow
                // const li = document.createElement('li');
                // li.textContent = emps.enheter[i].navn
                // append list element to your <ul> list 
                // document.getElementById('list-section').appendChild(li);
                console.log("HM: " + el.target)
            }
            
            document.getElementById('empList').appendChild(btn)
        }
    });
});


function empName(){
    return document.getElementById("emp").value;
};

async function getEmps() {
    url = new URL('https://data.brreg.no/enhetsregisteret/api/enheter?navn=' + empName() + '&konkurs=false&sort=antallAnsatte,DESC');
    let response = await fetch(url);
    let body = await response.json();
    return body._embedded;
    }

