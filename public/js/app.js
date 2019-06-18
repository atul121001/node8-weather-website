console.log("Client side javascript file is loaded");

function fetchTheWeather(search){
    if(search){
            message1.textContent = "Loading..."

            fetch("/weather?address="+search).then((res) => {
            res.json().then((data)=>{
                if(data.error){
                    console.log(data.error);
                }else{
                    message1.textContent = data.location;
                    message2.textContent = data.weatherForecast
                }
            });
        })
    }

}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");



weatherForm.addEventListener('submit', function(e){
    e.preventDefault();
    fetchTheWeather(search.value);
});