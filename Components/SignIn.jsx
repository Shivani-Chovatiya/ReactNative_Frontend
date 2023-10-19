import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const userInfo = AsyncStorage.getItem("userInfo");

  const handleChange = (field, value) => {
    console.log(field);
    if (field === "email") {
      setEmail(value);
    }

    if (field === "email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      console.log(!emailPattern.test(value));
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, email: "email Invalid " });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //dispatch
    if (email === "") {
      setMessage("Email can not be empty ");
    } else if (password === "") {
      setMessage("Password can not be empty ");
    } else {
      try {
        const response = await axios.post(
          // "http://192.168.43.208:8080/api/users/login",
          // "http://localhost:8080/api/users/login",
          "https://nodejs-backend-khiz.onrender.com/api/users/login",
          {
            email,
            password,
          }
        );
        // console.log(response);
        // setMessage("User Registered....");
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
        // console.log(
        //   AsyncStorage.setItem("userInfo", JSON.stringify(response.data))
        // );
        // console.log(response.data);
        navigation.navigate("Admin");
      } catch (error) {
        // console.log(error.response.status);
        if (error.response.status === 401) {
          setMessage("Invalid Email or Password!!");
        } else if (error.response.status === 404) {
          setMessage("User Not Found");
        }
        // console.log(error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* {message && <Text variant="danger">{message}</Text>} */}
      <Text style={styles.header}>Sign In</Text>

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={
          // (text) => setEmail(text)

          (text) => handleChange("email", text)
        }
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Sign In" onPress={submitHandler} />
      {message && <Text style={styles.error}>{message}</Text>}
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("SignUp")} // Navigate to the 'Login' screen
      >
        <Text style={styles.loginLink}>
          New User? <Text style={styles.loginText}>Register</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    backgroundColor: "white",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    marginTop: 20,
    textAlign: "center",
  },
  loginText: {
    color: "#007AFF",
  },
  error: {
    color: "red",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
});

export default SignIn;
