import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Forecast.css";

const Forecast = ({ date, icon, value , maxTemp,  minTemp}) => {
  const wordsToDate = (words) => {
    words = words.toString().split(" ");
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const month = months[words[0]];
    const date = words[1];

    return new Date(2022, month, date);
  };

  const isDateToday = (date) => {
    const today = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return today === date;
  };

  return (
    <div className="forecast">
      <h2 className="forecast-date">
        {isDateToday(
          wordsToDate(date).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        )
          ? "Today"
          : date}
      </h2>
      <div className="row">
        <FontAwesomeIcon
          icon={`fa-solid ${icon}`}
          className="forecast-weather__icon"
        />
        <div className="data">
          <h3 className="forecast-data">Min Temp</h3>
          <h2 className="forecast-humidity">{minTemp}°C</h2>
        </div>

        <div className="data">
          <h3 className="forecast-data">Max Temp</h3>
          <h2 className="forecast-humidity">{maxTemp}°C</h2>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
