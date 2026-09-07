//react-native팀은 react-native서비스를 축소했고 커뮤니티에서 자체 package를 만들어야하고
//expo팀은 react-native를 react-native의 기능을 확장하고 react-native를 쉽게 사용할 수 있도록 도와주는 서비스를 제공한다.
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
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

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [location, setLocation] = useState();

  const ask = async () => {
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
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
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
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
    fontWeight: "600",
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
