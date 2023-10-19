import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { Table, Row } from "react-native-table-component";
import { Ionicons } from "@expo/vector-icons";
import EditUser from "./EditUser";
import { useNavigation } from "@react-navigation/native";
import { SweetAlert } from "react-native-sweet-alert";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [showScreen, setShowscreen] = useState(false);
  const navigation = useNavigation();

  const deleteUser = (userid) => () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            axios.post(
              // `http://localhost:8080/api/users/deleteuser`,
              // `http://192.168.43.208:8080/api/users/deleteuser`,
              "https://nodejs-backend-khiz.onrender.com/api/users/deleteuser",
              {
                userid,
              }
            );
          },
        },
      ]
    );

    navigation.navigate("Admin");
  };

  useEffect(() => {
    // const response = axios.get(
    //   "http://192.168.43.208:8080/api/users/getallusers"
    //   // http://localhost:8080/api/users/getallusers,
    // );
    // console.log(response.data);
    // setUsers(response.data);

    fetch(
      // "http://192.168.43.208:8080/api/users/getallusers"
      "https://nodejs-backend-khiz.onrender.com/api/users/getallusers"
    )
      .then((response) => response.json())
      .then((data) => setUsers(data));

    // navigation.navigate("Admin");
    // catch (error) {
    //   if (error.response.status === 404) {
    //     setMessage(error);
    //   }
    // }
  }, []);

  const tablehead = ["Image", "Name", "Email", "Action"];

  console.log(users);

  return (
    <View style={styles.container}>
      {/* <Image
        source={{
          uri: "https://allinoneemployment.com/wp-content/uploads/2014/09/8-business-woman-girl-png-image.png",
        }}
        style={{
          width: 250,
          height: 100,
        }}
      /> */}
      <Table borderStyle={{ borderColor: "#C1c0B9" }}>
        <Row
          data={tablehead}
          style={styles.head}
          textStyle={
            // { fontWeight: "bold", color: "white" }
            styles.text
          }
        />
      </Table>

      {users.map((user, index) => (
        <Table key={index} borderStyle={{ borderColor: "#C1C0B9" }}>
          <Row
            data={[
              // user.image,
              <Image
                source={{ uri: user.image }}
                style={{
                  width: 50,
                  height: 80,
                }}
              />,
              user.name,
              user.email,
              [
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(`View`, { userId: user._id })
                  }
                >
                  <Ionicons name="ios-eye" size={20} color="blue" />
                </TouchableOpacity>,
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(`Edit`, { userId: user._id })
                  }
                >
                  <Ionicons name="ios-pencil" size={20} color="blue" />
                </TouchableOpacity>,
                <TouchableOpacity onPress={deleteUser(user._id)}>
                  <Ionicons name="trash" size={20} color="blue" />
                </TouchableOpacity>,
              ],
            ]}
            textStyle={styles.text}
          />
        </Table>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 3 },
});

export default Userlist;
