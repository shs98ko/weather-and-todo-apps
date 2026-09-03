import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//view => container (text를 사용할수 없다)
//text => span, p...
/* StatusBar는 상태바를 의미한다.  화면에 표시되지 않는 컴포넌트이고 
이와 같이 ios및 android와 소통하기 위한 일부 컴포넌트가 존재한다*/

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
