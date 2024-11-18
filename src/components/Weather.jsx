import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.webp'

const Weather = () => {

         const inputRef = useRef()

         const [weatherData, setWeatherData] = useState(false);

         const allIcons = {
          "01d": clear_icon,
          "01n": clear_icon,
          "02d": cloud_icon,
          "02n": cloud_icon,
          "03d": cloud_icon,
          "03n": cloud_icon,
          "04d": cloud_icon,
          "04n": cloud_icon,
          "09d": cloud_icon,
          "09n": cloud_icon,
          "10d": cloud_icon,
          "10n": cloud_icon,
          "13d": cloud_icon,
          "13n": cloud_icon,
         }

         const search = async (city)=>{
          if(city ===""){
              alert("Enter City Name");
              return
          }
          try{
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;


            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
              alert(data.message);
              return;
            }

            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear_icon;

              setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
              })


          }catch(error){
            searchWeatherData(false);
            console.error("Error in fetching weather data");
          }
         }

           useEffect(()=>{
            search('London');
           },[]) 

  return (
    <div className='weather'>

      {weatherData?<>
        <p className='location'>{weatherData.location}</p>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
      </>:<></>}
      

        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search'></input>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>

        {weatherData?<>
          
          <p className='temperature'>{weatherData.temperature}ºc</p>
          

          <div className="weather-data">

            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
           
          </div>
        </>:<></>}
    
          

    </div>
  )
}

export default Weather
