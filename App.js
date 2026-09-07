//react-native팀은 react-native서비스를 축소했고 커뮤니티에서 자체 package를 만들어야하고
//expo팀은 react-native를 react-native의 기능을 확장하고 react-native를 쉽게 사용할 수 있도록 도와주는 서비스를 제공한다.
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
//view => container (text를 사용할수 없다)
//text => span, p...
/* StatusBar는 상태바를 의미한다.  화면에 표시되지 않는 컴포넌트이고 
이와 같이 ios및 android와 소통하기 위한 일부 컴포넌트가 존재한다*/
//component (ex. View, Text, StatusBar) => 화면에 표시되는 컴포넌트
//APIs(ex. StyleSheet, Alert) => 운영체제와 소통하는 자바스크립트 코드
// 웹과 다르게 block,inline-block, inline이 존재하지 않는다.
// 1. view는 기본적으로 flex container이다.
// 또한 웹과 다르게 flexDirection의 기본값이 column이다.
// 2. 너비와 높이에 기반하여 레이아웃을 구성하지 않는다.

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [dailyWeather, setDailyWeather] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    console.log(json);

    setDailyWeather(json.list);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return ok ? (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {dailyWeather.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          dailyWeather.map((weather, index) => (
            <View key={index} style={styles.day}>
              <View>
                <Text style={styles.date}>{weather.dt_txt.slice(5, 16)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(weather.main.temp).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[weather.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>
              <Text style={styles.description}>{weather.weather[0].main}</Text>
              <Text style={styles.tinyText}>
                {weather.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  date: {
    marginTop: 50,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    fontWeight: "600",
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
});
