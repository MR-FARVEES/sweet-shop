import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, Dimensions, TextInput } from "react-native"

const { width } = Dimensions.get("window")
const isTablet = width >= 600 

export const GlobalCSS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  veritcalGap: {
    marginTop: 10,
  },
  formContainer: {
    margin: 20,
    marginTop: 50,
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formText: {
    fontSize: 16,
  },
  formInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 8,
  },
  formInput: {
    flex: 1,
    paddingLeft: 10,
  },
  formInputIcon: {
    padding: 10,
    alignSelf: "center",
  },
  formButtonContainer: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
  },
  formButton: {
    marginBottom: isTablet ? 0 : 10,
    borderRadius: 999,
  },
  formButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  formLink: {
    margin: 10,
    textAlign: "center",
  },
  formError: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  formErrorText: {
    color: "#721c24",
    fontSize: 16,
  },
  formSuccess: {
  },
  formSuccessText: {
  },
  bgSuccess: {
    backgroundColor: "#33b249",
  },
  bgInfo: {
    backgroundColor: "#5783db",
  },
  textSucess: {
    color: "#33b249",
  },
  textInfo: {
    color: "#5783db",
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  bottomNavBarButton: {
    alignItems: "center"
  },
  bottomTabBarButtonText: {
    marginVertical: 5,
    fontSize: 12,
  },
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
});