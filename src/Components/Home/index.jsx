import React from "react";
import { useState, useEffect } from "react";
import "./module.home.css";
import SearchBar from "../../Components/SearchBar";
import { CurrentWeather, findIcon } from "../../Components/CurrentWeather";
import TempChart from "../../Components/TempChart";
import Forecast from "../../Components/Forecast";
import ExtraData from "../../Components/ExtraData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloudImg from "../../assets/cloud2.jpg";
import nightImg from "../../assets/night.jpg";
import { useNavigate } from "react-router-dom";
import { dateToWords } from "../../constant";
import moment from "moment";

const Home = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  // Get today's date
  const today = moment();

  // Calculate the date 7 days ago
  const sevenDaysAgo = today.clone().subtract(7, "days");

  // Format the dates if needed
  const startDate = today.format("YYYY-MM-DD");
  const endDate = sevenDaysAgo.format("YYYY-MM-DD");

  // Change the background image when the toggle state changes
  useEffect(() => {
    document.body.style = `background-image:  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${
      toggle ? cloudImg : cloudImg
    });`;
  }, [toggle]);

  // Check if time is day or night
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    setToggle(isDay);
  }, []);

  // API key from www.weatherapi.com
  const apiKey = "76bb8e10c00d4d28a0082234231110";

  // Get user's location using the Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (err) => console.log(err)
    );
  }, []);

  // Fetch weather data from the weather API using latitude and longitude
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${
        lat || 28.6304
      }, ${lon || 77.2177}&days=7&aqi=no&alerts=yes`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [lat, lon]);

  // Fetch weather data from the weather API using location from the search bar
  useEffect(() => {
    if (location === "") {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${
          lat || 28.6304
        }, ${lon || 77.2177}&days=7&aqi=no&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => {
          console.log(err.message);
        });

      
    } else {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => {
          console.log(err.message);
        });

      
    }
  }, [location]);

  // Store the current weather data in an object

  const currentData = {
    temp: weather?.current?.temp_c,
    location: weather?.location?.name,
    date: weather?.location?.localtime,
    icon: weather?.current?.condition?.icon,
    text: weather?.current?.condition?.text,
  };

  console.log(currentData);

  // Store the extra weather data in an object
  const extraData = {
    pressure: weather?.current?.pressure_mb,
    wind: weather?.current?.wind_mph,
  };

  // Store the forecast data in an array
  const forecastDays = weather?.forecast?.forecastday;

  console.log({ forecastDays });

  // Store the hourly temperature data in an array
  const temps = [];
  weather?.forecast?.forecastday[0].hour.map((hour) => {
    temps.push(hour.temp_c);
  });

  // Filter the hourly temperature data to get the temperature every 3 hours
  const eightTemps = temps.filter((_, i) => i % 3 === 0);

  // Add the last temperature to the array
  const nineTemps = [...eightTemps, temps[temps.length - 1]];

  // Convert the date to words

  return (
    <div className="App">
      <nav className="nav">
        <div className="logo">
          <FontAwesomeIcon
            icon="fa-brands fa-skyatlas"
            className="logo__icon"
          />
          <h1 className="logo__text">Weather-Watch</h1>
        </div>
        <SearchBar setCity={setLocation} toggle={toggle} />
        <FontAwesomeIcon
          icon="fa-solid fa-circle-half-stroke"
          className="switch-mode"
          onClick={() => {
            setToggle(!toggle);
          }}
          style={{
            transform: toggle ? "scaleX(1)" : "scaleX(-1)",
          }}
        />
      </nav>

      <div className="grid-two">
        <div className="grid-one">
          <CurrentWeather weatherData={currentData} />
          <div className="grid-three">
            {forecastDays?.map((day, i) => {
              return (
                i < 3 && (
                  <Forecast
                    maxTemp={day?.day?.maxtemp_c}
                    minTemp={day?.day?.mintemp_c}
                    key={day.date}
                    date={dateToWords(day.date)}
                    icon={findIcon(day.day?.condition?.text)}
                    value={day.day?.avghumidity}
                  />
                )
              );
            })}
          </div>
          <div className="grid-three">
            <ExtraData extraData={extraData} />
          </div>
        </div>
        <div className="grid-four">
          <TempChart tempsData={nineTemps} />
          {currentData?.temp && (
            <div style={{ width: "100%" }}>
              <h3
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  navigate("/days", {
                    state: {
                      data: forecastDays,
                    },
                  })
                }
              >
                View 7 days forecast
              </h3>

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
