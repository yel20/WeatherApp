import { useState,useEffect} from "react";

import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";

import styles from './weatherApp.module.css'
import Spinner from "./Spinner";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  
  const loadInfo = async (city = "venezuela") => {
    try {
      const resquest = await fetch(
        `http://api.weatherapi.com/v1/current.json?aqi=no&key=2dc7cb7d9faa4cc0aeb192723231902&q=${city}`
      );
      const json = await resquest.json();
      console.log(json);
      setWeather(json);
    } catch (error) {
      console.log("hay un error " + error);
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

 

  const handleChangeCity = (city) => {
    setWeather(null);
    loadInfo(city);
  };
  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ? <WeatherMainInfo weather={weather}/> : <Spinner/> }
     
    </div>
  );
};

export default WeatherApp;
