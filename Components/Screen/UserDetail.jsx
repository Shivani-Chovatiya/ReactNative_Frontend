import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CheckBox } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const UserDetail = () => {
  const route = useRoute();
  const { userId } = route.params;
  console.log(userId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [check, setcheck] = useState("");
  const [message, setMessage] = useState("");
  const [image, setimage] = useState("");
  const [isChecked, setCheked] = useState(false);
  const [user, setUser] = useState();

  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_no: "",
    gender: "",
    city: "",
    state: "",
    check: "",
    image: "",
  });

  const onValueChange = (itemValue, itemIndex) => {
    if (itemValue === "") {
      return;
    }
    setcity(itemValue);
  };

  const handleChange = (field, value) => {
    console.log(field);
    if (field === "email") {
      setEmail(value);
    }
    if (field === "mobile_no") {
      setMobileNo(value);
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
    if (field === "mobile_no") {
      const numberPattern = /^[1-9]{1}[0-9]{9}$/;
      console.log(!numberPattern.test(value));
      if (!numberPattern.test(value)) {
        setErrors({ ...errors, mobile_no: "Mobile No. Invalid " });
      } else {
        setErrors({ ...errors, mobile_no: "" });
      }
    }
  };

  const fetchdata = async () => {
    const response = await axios.post(
      // "http://192.168.43.208:8080/api/users/profile",
      // "http://localhost:8080/api/users/profile",
      "https://nodejs-backend-khiz.onrender.com/api/users/profile",
      {
        userId,
      }
    );
    console.log(response);
    setUser(response.data);
    // setMessage("User Registered....");

    // console.log(response.data);
    //   navigation.navigate("Admin");
  };

  useEffect(() => {
    // if (!userInfo) {
    //   history.push("/login");
    // } else {
    if (!user?.name) {
      // dispatch(getUserDetails(userId));
      // destroy
      fetchdata();
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setPassword(user?.password);
      setConfirmPassword(user?.confirmPassword);
      setMobileNo(user?.mobile_no);
      setGender(user?.gender);
      setcheck(user?.check);
      setcity(user?.city);
      setstate(user?.state);
    }
    // }
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* {message && <Text variant="danger">{message}</Text>} */}
      <Text style={styles.header}> User Information</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={
            //   (text) => setEmail(text)

            (text) => handleChange("email", text)
          }
        />
      </View>
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
      <View style={styles.row}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Confirm Password: :</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <View style={styles.row}>
        <Text>Mobile No:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile No"
          value={mobile_no}
          onChangeText={
            //   (text) => setMobileNo(text)
            (text) => handleChange("mobile_no", text)
          }
        />
      </View>
      {errors.mobile_no ? (
        <Text style={styles.error}>{errors.mobile_no}</Text>
      ) : null}
      <Text>Gender</Text>
      <RadioButton.Group
        onValueChange={(text) => setGender(text)}
        value={gender}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="Male" />
          <Text>Male</Text>
          <RadioButton value="Female" />
          <Text>Female</Text>
        </View>
      </RadioButton.Group>

      {/* <TextInput
      style={styles.input}
      placeholder="How did you hear about this?  "
      value={check}
      onChangeText={(text) => setcheck(text)}
    /> */}
      {/* <TextInput
      style={styles.input}
      placeholder="City"
      value={city}
      onChangeText={(text) => setcity(text)}
    /> */}
      <Text>Select City:</Text>
      <Picker
        city={city}
        onValueChange={
          // (text, index) => setcity(text)
          onValueChange
        }
      >
        <Picker.Item label="Choose..." value="" />
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Ahmedabad" value="Ahmedabad" />
        <Picker.Item label="Pune" value="Pune" />
      </Picker>
      <Text>{city === "Choose..." ? "" : city}</Text>
      {/* <TextInput
      style={styles.input}
      placeholder="State"
      value={state}
      onChangeText={(text) => setstate(text)}
    /> */}
      <Text style={{ marginTop: 10 }}>Select State:</Text>
      <Picker
        state={state}
        onValueChange={(text) => setstate(text)}
        value={state}
      >
        <Picker.Item label="Choose..." value="Choose..." />
        <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />

        <Picker.Item
          label="Andaman and Nicobar Islands"
          value="Andaman and Nicobar Islands"
        />
        <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
        <Picker.Item label="Assam" value="Assam" />
        <Picker.Item label="Bihar" value="Bihar" />
        <Picker.Item label="Chandigarh" value="Chandigarh" />
        <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
        <Picker.Item
          label="Dadar and Nagar Haveli"
          value="Dadar and Nagar Haveli"
        />
        <Picker.Item label="Daman and Diu" value="Daman and Diu" />
        <Picker.Item label="Delhi" value="Delhi" />
        <Picker.Item label="Lakshadweep" value="Lakshadweep" />
        <Picker.Item label="Puducherry" value="Puducherry" />
        <Picker.Item label="Goa" value="Goa" />
        <Picker.Item label="Gujarat" value="Gujarat" />
        <Picker.Item label="Haryana" value="Haryana" />
        <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
        <Picker.Item label="Jammu and Kashmir" value="Jammu and Kashmir" />

        <Picker.Item label="Jharkhand" value="Jharkhand" />

        <Picker.Item label="Karnataka" value="Karnataka" />

        <Picker.Item label="Kerala" value="Kerala" />
        <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
        <Picker.Item label="Maharashtra" value="Maharashtra" />
        <Picker.Item label="Manipur" value="Manipur" />
        <Picker.Item label="Meghalaya" value="Meghalaya" />

        <Picker.Item label="Mizoram" value="Mizoram" />
        <Picker.Item label="Nagaland" value="Nagaland" />
        <Picker.Item label="Odisha" value="Odisha" />
        <Picker.Item label="Punjab" value="Punjab" />
        <Picker.Item label="Rajasthan" value="Rajasthan" />
        <Picker.Item label="Sikkim" value="Sikkim" />

        <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
        <Picker.Item label="Telangana" value="Telangana" />

        <Picker.Item label="Tripura" value="Tripura" />
        <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
        <Picker.Item label="Uttarakhand" value="Uttarakhand" />
        <Picker.Item label="West Bengal" value="West Bengal" />
      </Picker>
      <Text>{state === "Choose..." ? "" : state}</Text>

      {message && <Text style={styles.error}>{message}</Text>}
      {/* <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("SignIn")} // Navigate to the 'Login' screen
      >
        <Text style={styles.loginLink}>
          Already have an account? <Text style={styles.loginText}>Login</Text>
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  label: {},
  container: {
    // flex: 1,
    // padding: 10,
    padding: 10,
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
    height: 35,
    flex: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
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
    // marginTop: 20,
    textAlign: "center",
  },
  loginText: {
    color: "#007AFF", // Change the color to your preference
  },
  error: {
    color: "green",
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

export default UserDetail;
