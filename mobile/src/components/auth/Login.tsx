import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { GlobalCSS } from "../../../GlobalCSS"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = () => {

  }
  
  return (
    <View style={GlobalCSS.container}>
      <KeyboardAvoidingView>
        <View style={GlobalCSS.formContainer}>
          <Text style={GlobalCSS.formTitle}>Login</Text>
          <Text style={GlobalCSS.formText}>Please enter your credentials</Text>
          <View style={GlobalCSS.veritcalGap} />
          <View style={GlobalCSS.formInputContainer}>
            <Ionicons name="person-circle-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
            <TextInput placeholder="Username" autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}/>
          </View>
          <View style={GlobalCSS.formInputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
            <TextInput placeholder="Password" secureTextEntry autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}/>
          </View>
          <View style={GlobalCSS.formButtonContainer}>
            <TouchableOpacity style={[GlobalCSS.formButton, GlobalCSS.bgInfo]} onPress={() => {}}>
              <Text style={GlobalCSS.formButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={GlobalCSS.formLink}>
            Don't have an account?{" "}
            <Text style={[{fontWeight: "bold"}, GlobalCSS.textInfo]} onPress={() => router.push("/Register")}>
              Register
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
