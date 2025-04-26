import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalCSS } from "../../../GlobalCSS";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    const url = "http://172.20.26.233:5005/api/auth/login/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        router.push("/Home");
      } else {
        setError(true);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={GlobalCSS.container}>
      <KeyboardAvoidingView>
        <View style={GlobalCSS.formContainer}>
          <Text style={GlobalCSS.formTitle}>Login</Text>
          {error ? (
            <View style={GlobalCSS.formError}>
              <Text style={[GlobalCSS.formErrorText, { width: "85%" }]}>
                Error: {errorMessage}
              </Text>
              <TouchableOpacity onPress={() => setError(false)}>
                <Ionicons
                  name="close-circle-outline"
                  size={24}
                  color={"#721c24"}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={GlobalCSS.formText}>
              Please enter your credentials
            </Text>
          )}
          <View style={GlobalCSS.veritcalGap} />
          <View style={GlobalCSS.formInputContainer}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color="black"
              style={GlobalCSS.formInputIcon}
            />
            <TextInput
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              style={GlobalCSS.formInput}
              onChangeText={setUsername}
              value={username}
            />
          </View>
          <View style={GlobalCSS.formInputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="black"
              style={GlobalCSS.formInputIcon}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={GlobalCSS.formInput}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={GlobalCSS.formButtonContainer}
            />
          ) : (
            <>
              <View style={GlobalCSS.formButtonContainer}>
                <TouchableOpacity
                  style={[GlobalCSS.formButton, GlobalCSS.bgInfo]}
                  onPress={() => handleLogin()}
                >
                  <Text style={GlobalCSS.formButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
              <Text style={GlobalCSS.formLink}>
                Don't have an account?{" "}
                <Text
                  style={[{ fontWeight: "bold" }, GlobalCSS.textInfo]}
                  onPress={() => router.push("/Register")}
                >
                  Register
                </Text>
              </Text>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
