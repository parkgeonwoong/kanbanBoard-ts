/**
 * @desc: 날씨 API
 */

import { useEffect, useState } from "react";
import styled from "styled-components";
import geolocation from "./geolocation";

// 날씨 타입
interface IWheather {
  main: {
    temp: number;
  };
  weather: [
    {
      main: string;
    }
  ];
  name: string;
}

function Weather() {
  const APIKEY = import.meta.env.VITE_WEATHER_KEY;
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [weather, setWeather] = useState<IWheather>();

  // NOTE: 위치 정보 가져오기
  geolocation({ setLat, setLon });

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [lat, lon]);

  return (
    <Container>
      <Wrapper>
        <span>{weather?.name}</span>
      </Wrapper>
      <Wrapper>
        <span>{weather?.main.temp} ℃</span>
        <span>{weather?.weather[0].main}</span>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  span {
    margin: 0 5px;
    font-size: 11px;
  }

  :first-child {
    span {
      font-size: 13px;
    }
  }
`;

export default Weather;
