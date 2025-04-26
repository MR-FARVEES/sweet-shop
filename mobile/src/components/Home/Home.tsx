import { View, Text, TouchableOpacity } from "react-native"
import { Feather, AntDesign } from "@expo/vector-icons"
import { GlobalCSS } from "../../../GlobalCSS"
import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import Invoice from "./invoice/Invoice";
import Inventory from "./inventory/Inventory";
import Customer from "./customer/Customer";
import Account from "./account/Account";

export default function HomeScreen() {
  const [screen, setScreen] = useState<string>('home')
  
  const handleSelectScreen = (screen: string) => {
    setScreen(screen)
  }

  return (
    <View style={GlobalCSS.container}>
      <View style={GlobalCSS.screen}>
        { screen == "home" && <Dashboard />}
        { screen == "sales" && <Invoice />}
        { screen == "inventory" && <Inventory />}
        { screen == "customer" && <Customer />}
        { screen == "account" && <Account />}
      </View>
      <View style={GlobalCSS.bottomNavbar}>
        <TouchableOpacity onPress={() => handleSelectScreen("home")} style={GlobalCSS.bottomNavBarButton}>
          <Feather name="home" color={screen === "home" ? "#000" : "#666666"} size={24}/>
          <Text style={[GlobalCSS.bottomTabBarButtonText, {color: screen === "home" ? "#000" : "#666666"}]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectScreen("sales")} style={GlobalCSS.bottomNavBarButton}>
          <Feather name="shopping-bag" color={screen === "sales" ? "#000" : "#666666"} size={24} />
          <Text style={[GlobalCSS.bottomTabBarButtonText, {color: screen === "sales" ? "#000" : "#666666"}]}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectScreen("inventory")} style={GlobalCSS.bottomNavBarButton}>
          <Feather name="box" color={screen === "inventory" ? "#000" : "#666666"} size={24} />
          <Text style={[GlobalCSS.bottomTabBarButtonText, {color: screen === "inventory" ? "#000" : "#666666"}]}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectScreen("customer")} style={GlobalCSS.bottomNavBarButton}>
          <Feather name="users" color={screen === "customer" ? "#000" : "#666666"} size={24} />
          <Text style={[GlobalCSS.bottomTabBarButtonText, {color: screen === "customer" ? "#000" : "#666666"}]}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectScreen("account")} style={GlobalCSS.bottomNavBarButton}>
          <AntDesign name="barschart" color={screen === "account" ? "#000" : "#666666"} size={24} />
          <Text style={[GlobalCSS.bottomTabBarButtonText, {color: screen === "account" ? "#000" : "#666666"}]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
