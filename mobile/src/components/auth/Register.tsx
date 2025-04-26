import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { GlobalCSS } from '../../../GlobalCSS'

export default function RegisterForm() {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [bussinessName, setBussinessName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const reset = () => {
    setFirstName('')
    setLastName('')
    setUsername('')
    setPassword('')
    setEmail('')
    setContact('')
    setAddress('')
    setBussinessName('')
  }

  const handleRegister = async () => {
    // Here my static ip 172.20.26.233 for you use your own.
    setLoading(true)
    const url = 'http://172.20.26.233:5005/api/auth/register/'
    const payload = {
      firstName,
      lastName,
      username,
      password,
      email,
      address,
      contact,
      bussinessName,
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (!response.ok) {
        if (data.error) {
          setError(true)
          setErrorMessage(data.error)
          return
        }
      } else {
        reset()
        router.push('/Login')
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <View style={GlobalCSS.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={GlobalCSS.formContainer}>
            <Text style={GlobalCSS.formTitle}>Register</Text>
            { error ? (
              <View style={GlobalCSS.formError}>
                <Text style={[GlobalCSS.formErrorText, {width: "85%"}]}>Error: {errorMessage}</Text>
                <TouchableOpacity onPress={() => setError(false)}>
                  <Ionicons name="close-circle-outline" size={24} color={"#721c24"}/>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={GlobalCSS.formText}>Create a new account</Text>
            )}
            <View style={GlobalCSS.veritcalGap} />
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="create-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="First Name" autoCapitalize="words" autoCorrect={false} style={GlobalCSS.formInput} 
                onChangeText={setFirstName} value={firstName}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="create-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Last Name" autoCapitalize="words" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setLastName} value={lastName}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="person-circle-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Username" autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setUsername} value={username}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Password" secureTextEntry autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setPassword} value={password}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="mail-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Email" autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setEmail} value={email}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="person-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Contact" autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setContact} value={contact}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="location-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Address" autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setAddress} value={address}/>
            </View>
            <View style={GlobalCSS.formInputContainer}>
              <Ionicons name="briefcase-outline" size={24} color="black" style={GlobalCSS.formInputIcon}/>
              <TextInput placeholder="Business" autoCapitalize="none" autoCorrect={false} style={GlobalCSS.formInput}
                onChangeText={setBussinessName} value={bussinessName}/>
            </View>
            { loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={GlobalCSS.formButtonContainer}/>
            ) : (
              <>
                <View style={GlobalCSS.formButtonContainer}>
                  <TouchableOpacity style={[GlobalCSS.formButton, GlobalCSS.bgInfo]} onPress={() => handleRegister()}>
                    <Text style={GlobalCSS.formButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
                <Text style={GlobalCSS.formLink}>
                  Already have an account?{" "}
                  <Text style={[{fontWeight: "bold"}, GlobalCSS.textInfo]} onPress={() => router.push("/Login")}>
                    Login
                  </Text>
                </Text>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}