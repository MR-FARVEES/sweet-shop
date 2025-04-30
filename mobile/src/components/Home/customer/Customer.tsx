import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { GlobalCSS } from "../../../../GlobalCSS";
import { useEffect, useState } from "react";
import { CustomerProps } from "../../../interface/Customer";
import CreateModel from "./Create";

const customersData: CustomerProps[] = [
  {
    fullName: "Farvees",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
  {
    fullName: "Jainoose",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
  {
    fullName: "Jafran",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
  {
    fullName: "Ijas",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
  {
    fullName: "Jainoose",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
  {
    fullName: "Jafran",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
  {
    fullName: "Ijas",
    businessName: "JF Business Zone",
    contact: "0756720854",
    address: "",
  },
];

export default function Customer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [filteredCustomers, setFilteredCustomer] = useState<CustomerProps[]>(
    []
  );
  const [showCreateModel, setShowCreateModel] = useState<boolean>(false);

  const filterCustomer = () => {
    if (searchText == "") {
      setFilteredCustomer(customersData);
    } else {
      const filtered = customers.filter((customer) =>
        customer.fullName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCustomer(filtered);
    }
  };

  useEffect(() => {
    setLoading(true);
    setCustomers(customersData);
    filterCustomer();
    setLoading(false);
  }, [searchText]);

  return (
    <View style={GlobalCSS.screen}>
      <CreateModel
        showCreateModel={showCreateModel}
        setShowCreateModel={setShowCreateModel}
      />
      <View>
        <View style={GlobalCSS.screenHeader}>
          <Text style={GlobalCSS.screenHeaderText}>Manage Customer</Text>
          <View style={GlobalCSS.screenHeaderRightText}>
            <TouchableOpacity onPress={() => setShowCreateModel(true)}>
              <View style={GlobalCSS.primaryButton}>
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                >
                  + Add Customer
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            padding: 2,
            borderWidth: 2,
            borderColor: "#8e8e8e",
            borderRadius: 16,
            margin: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 14,
            }}
          >
            <Feather
              name="search"
              size={20}
              color={"#8e8e8e"}
              style={{ marginTop: 10, marginLeft: 10 }}
            />
            <TextInput
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              placeholder="Search customers"
              multiline={false}
              numberOfLines={1}
              style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
            />
          </View>
        </View>
        <View>
          {loading ? (
            <ActivityIndicator size={"large"} color={"#007AFF"} />
          ) : (
            <ScrollView>
              {filteredCustomers.map((customer, index) => (
                <View
                  key={index}
                  style={{
                    borderWidth: 2,
                    borderColor: "#ccc",
                    borderRadius: 14,
                    marginHorizontal: 10,
                    marginVertical: 5,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{}}>
                    <Text style={{ fontSize: 18, fontWeight: 600 }}>
                      {customer.businessName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#8e8e8e",
                      }}
                    >
                      {customer.fullName}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 600 }}>
                      {customer.contact}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 0.3,
                      marginRight: 15,
                    }}
                  >
                    <Feather name="edit" size={20} color={"#000"} />
                    <Feather name="trash" size={20} color={"#000"} />
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
