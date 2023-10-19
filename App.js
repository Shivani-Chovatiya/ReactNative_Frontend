import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Admin from "./Components/Admin";
import Userlist from "./Components/Screen/Userlist";
import AddNewUser from "./Components/Screen/AddNewUser";
import EditUser from "./Components/Screen/EditUser";
import UserDetail from "./Components/Screen/UserDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>hello world!!</Text>

    //   <StatusBar style="auto" />
    // </View>

    <NavigationContainer>
      <Stack.Navigator
      //  initialRouteName="Login"
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Edit" component={EditUser} />
        <Stack.Screen name="View" component={UserDetail} />
        {/* <Stack.Screen name="Userlist" component={Userlist} />
        <Stack.Screen name="AddNewUser" component={AddNewUser} /> */}
        {/* <Text>Hello</Text> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
