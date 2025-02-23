const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn =  document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(select of dropDowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    };
    
        select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    });
  };
    const updateFlag = (element) =>{
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };

    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        if(amtVal === "" || amtVal > 1){
        amtVal == 1;
        amount.value ="1";
     };

     const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let reponse =  await fetch(URL);
     let data = await reponse.json();
     let rate = data[toCurr.value.toLowerCase()];
     let finalAmount = amtVal * rate ;
     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    });