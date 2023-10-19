import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Userlist from "./Screen/Userlist";
import AddNewUser from "./Screen/AddNewUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createAppContainer } from "react-navigation";
import EditUser from "./Screen/EditUser";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { Drawer } from "react-native-paper";

const Admin = () => {
  const [refresh, setRefresh] = useState(0);
  const navigation = useNavigation();
  const userInfo = AsyncStorage.getItem("userInfo");
  console.log(userInfo);
  const logout = () => () => {
    AsyncStorage.removeItem("userInfo");
    navigation.navigate("SignIn");
  };
  const Stack = createNativeStackNavigator();
  //   const Drawer = createDrawerNavigator();

  const [select, setSelect] = useState(null);

  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };
  const handle = (buttonname) => {
    setSelect(buttonname);
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={handleRefresh}>
          <Text>Refresh</Text>

          <View style={{ flexDirection: "row" }}>
            <Button title="All User" onPress={() => handle("All User")} />
            <Button title="Add User" onPress={() => handle("Add User")} />
          </View>
          <View style={{ flexDirection: "row" }}></View>
          <View style={{ flexDirection: "row" }}>
            {select === "All User" && <Userlist />}
            {select === "Add User" && <AddNewUser />}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Admin;
