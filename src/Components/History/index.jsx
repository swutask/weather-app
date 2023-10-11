import React from 'react'
import { useLocation } from 'react-router-dom';
import Forecast from '../Forecast';
import { dateToWords, findIcon } from '../../constant';

const History = () =>{
     const location = useLocation();

  let datas = location?.state?.data ? location?.state?.data : [];

  console.log(datas);

  return (
    <div className="mainBoxx">
      <div className="currentt">
        <h1 className="current-temp">
          {/* {weatherData?.temp} */}
          <sup>Weather history</sup>
        </h1>

        <div className="mainBoxBelow">
          {!datas ? (
            <div className="noData">
              {" "}
              <h1 style={{ textAlign: "center" }}>No data found</h1>
            </div>
          ) : (
            datas?.map((day, i) => {
              return (
                <div className="mainBoxBelowBox">
                  <Forecast
                    maxTemp={day?.day?.maxtemp_c}
                    minTemp={day?.day?.mintemp_c}
                    key={day.date}
                    date={dateToWords(day.date)}
                    icon={findIcon(day.day?.condition?.text)}
                    value={day.day?.avghumidity}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default History