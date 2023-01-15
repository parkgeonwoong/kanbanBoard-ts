// 위도,경도 타입
interface IGeo {
  coords: {
    latitude: number;
    longitude: number;
  };
}

// 매개변수 타입
interface IGeoParams {
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLon: React.Dispatch<React.SetStateAction<number>>;
}

function geolocation({ setLat, setLon }: IGeoParams) {
  // [성공시] 위도, 경도 가져오기
  const onGeoOk = ({ coords }: IGeo) => {
    setLat(coords?.latitude);
    setLon(coords?.longitude);
  };

  // [실패시] 경고창
  const onGeoError = () => {
    alert("Can't find you. No weather for you.");
  };

  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}

export default geolocation;
