const weatherForm= document.querySelector(".weatherForm");
const   cityInput=document.querySelector(".cityInput");
const   card=document.querySelector(".card");
const apikey="7bb8807591523ebfed37c0e51d942cec";

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city= cityInput.value.trim();
    if(city){
        try{
            const weatherdata= await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.log(error);
            displayError(error);

        }}
    else{
        displayError("please enter a valid city name");
    }
});

async function getweatherdata(city){
        const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
        const response= await fetch(apiurl);
        console.log(response);
        if(!response.ok){
            throw new Error("city not found");
        }
        return await response.json();
}

function displayweatherinfo(data){

    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]
    } =data;

    card.textContent="";
    card.style.display="flex";

    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const weatheremoji=document.createElement("p");

    citydisplay.textContent=city;
    citydisplay.classList.add("h1");
    tempdisplay.textContent=`${Math.round(temp-273.15)}°C`;
    tempdisplay.classList.add("tempDisplay");
    humiditydisplay.textContent=`Humidity: ${humidity}%`;
    humiditydisplay.classList.add("humidityDisplay");
    descdisplay.textContent=description;
    descdisplay.classList.add("descDisplay");
    weatheremoji.textContent=id<300 ? "🌩️":id<400 ? "🌧️":id<600 ? "☔":id<700 ? "☃️":id<800 ? "🌫️":id===800 ? "☀️":"☁️";
    weatheremoji.classList.add("weatheremoji");
    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
    




}
function displayError(message) {
    
  

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = ""; // Clear previous content
    card.style.display = "flex"; // Make sure the card is visible
    card.appendChild(errorDisplay);
}



