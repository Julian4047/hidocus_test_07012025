/*setTimeout(document.getElementById("cookie-accept").click(), 5000);

function funS() {
    document.getElementById("singleSearchInput").value = "holi";
    /* document.getElementById("singleSearchBtn").click();*/
/*
};
setTimeout(funS, 10000);
*/

/*<iframe src="https://who.is/whois/bluevolant.com"></iframe>*/
function s() {
    let dSv = document.getElementById("dS").value;
    /*let dSv2 =*/
    document.write('<iframe src="https://who.is/whois/' + dSv + '"></iframe>');
    /* 
    let dSv2 = document.createElement('iframe');
    let v = 'https://who.is/whois/' + dSv + '"></iframe>';
    dSv2.setAttribute("src", v);
    document.getElementById("domainLookerO123").appendChild(dSv2);
*/
    setTimeout(myGreeting, 5000);

    function myGreeting() {
        let rD = document.querySelector("center").firstChild.textContent;
        console.log(rD);
        /* document.write('<p>' + rD + '</p>');
         */
    };
};
document.getElementById("bS").addEventListener("click", s);
/*document.querySelector("center").firstChild.textContent*/