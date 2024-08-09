const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_rel_val = document.getElementById('temp_rel_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo = async(event)=> {
    event.preventDefault();
    let cityval = cityName.value;
    if(cityval === ""){
        city_name.innerText=`Please write city name before search`;
        datahide.classList.add('data_hide');

    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=8be0ebc9ed360797c5aa2c3e90e4d58f`
            const respone = await fetch(url)
            const data = await respone.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_rel_val.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            // console.log(data);
            const tempMood = arrData[0].weather[0].main;
            
            // condition to check sunny or cloudy
            if(tempMood === "Clear") {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood === "Clouds") {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud' style='color: #f1f2f6;'></i>"
            } else if (tempMood === "Rain") {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud-rain' style='color: #a4b0be;'></i>"
            } else {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style='color: #eccc68;'></i>";
            }
            datahide.classList.remove('data_hide');
        }catch {
            city_name.innerText=`Please write city name properly`;
            datahide.classList.add('data_hide');
        } 
    }
}

submitBtn.addEventListener('click', getInfo);