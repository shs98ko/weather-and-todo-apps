//react-native팀은 react-native서비스를 축소했고 커뮤니티에서 자체 package를 만들어야하고
//expo팀은 react-native를 react-native의 기능을 확장하고 react-native를 쉽게 사용할 수 있도록 도와주는 서비스를 제공한다.
import { StatusBar } from "expo-status-bar"; // expo가 제고하는 statusbar는 react-native에서 제공하는 statusbar와 같지만 더 많은 기능을 제공하는 api이다.
import { StyleSheet, Text, View } from "react-native";

//view => container (text를 사용할수 없다)
//text => span, p...
/* StatusBar는 상태바를 의미한다.  화면에 표시되지 않는 컴포넌트이고 
이와 같이 ios및 android와 소통하기 위한 일부 컴포넌트가 존재한다*/
//component (ex. View, Text, StatusBar) => 화면에 표시되는 컴포넌트
//Apis(ex. StyleSheet, Alert) => 운영체제와 소통하는 자바스크립트 코드
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World! Fuck the world!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // 객체를 만들어서 스타일을 지정할 수 있다. 자동완성 기능이 제공되어 편리.
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "red",
  },
});
