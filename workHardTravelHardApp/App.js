import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./color";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    initCategory();
    loadToDos();
  }, []);

  const travel = () => {
    setWorking(false);
    saveWorking(false);
  };
  const work = () => {
    setWorking(true);
    saveWorking(true);
  };

  const onchangeText = (text) => {
    setText(text);
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, success: false },
    };
    setToDos(newToDos);
    setText("");
    await saveToDos(newToDos);
  };

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };

  const deleteTodo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const successTodo = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].success = !newToDos[key].success;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  const saveWorking = async (isWorking) => {
    const category = isWorking ? "working" : "travel";
    await AsyncStorage.setItem("@key", category);
  };

  const initCategory = async () => {
    const category = await AsyncStorage.getItem("@key");
    setWorking(() => (category === "working" ? true : false));
  };

  const editText = (key) => {
    Alert.prompt(
      "Edit todo title",
      "새로운 내용을 입력하세요",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: (newText) => {
            if (!newText || newText.trim() === "") return;
            const newToDos = { ...toDos };
            newToDos[key].text = newText;
            setToDos(newToDos);
            saveToDos(newToDos);
          },
        },
      ],
      "plain-text",
      toDos[key].text,
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Works
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        style={styles.input}
        value={text}
        onChangeText={onchangeText}
        placeholder={
          working ? "What do you have to do?" : "Where do you want to go?"
        }
        returnKeyType="done"
      ></TextInput>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              <View style={{ flex: 8, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => successTodo(key)}>
                  <Fontisto
                    name={
                      toDos[key].success
                        ? "checkbox-active"
                        : "checkbox-passive"
                    }
                    size={18}
                    color={toDos[key].success ? theme.grey : "white"}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.toDoText,
                    {
                      marginHorizontal: 10,
                      textDecorationLine: toDos[key].success
                        ? "line-through"
                        : "none",
                      color: toDos[key].success ? theme.grey : "white",
                    },
                  ]}
                >
                  {toDos[key].text}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={() => editText(key)}>
                  <FontAwesome5
                    name="edit"
                    size={18}
                    color="white"
                  ></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => deleteTodo(key)}
                >
                  <Fontisto name="trash" size={18} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 30,
    fontWeight: 600,
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.toDoBg,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  toDoText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
