import { View, Text, TextInput, ScrollView, Modal, TouchableOpacity } from "react-native";
import { GlobalCSS } from "../../../../GlobalCSS";
import { useState, useEffect } from "react";
import { CustomerProps } from "../../../interface/Customer";
import { Ionicons } from "@expo/vector-icons";

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
  ];

export default function CreateModel({
    showCreateModel,
    setShowCreateModel,
  }: {
    showCreateModel: boolean;
    setShowCreateModel: (value: boolean) => void;
  }) {
    const [businessName, setBusinessName] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [deActivatedCustomers, setDeActiviatedCustomers] = useState<
      CustomerProps[]
    >([]);
    const [panel, setPanel] = useState<string>("new");
    const [searchText, setSearchText] = useState<string>("");
    const [filterDeactivatedCustomers, setFiltereDeactivatedCustomer] = useState<
      CustomerProps[]
    >([]);
  
    const filterCustomer = () => {
      if (searchText === "") {
        setFiltereDeactivatedCustomer(deActivatedCustomers);
      } else {
        const filtered = deActivatedCustomers.filter((customer) =>
          customer.fullName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFiltereDeactivatedCustomer(filtered);
      }
    };
  
    // TODO: create new customer
    const onCreate = async () => {
  
    }
  
    // TODO: activate customer again
    const onActivate = async () => {
  
    }
  
    useEffect(() => {
      setDeActiviatedCustomers(customersData);
    }, []);
  
    useEffect(() => {
      filterCustomer();
    }, [searchText])
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCreateModel}
        onRequestClose={() => setShowCreateModel(false)}
      >
        <View style={GlobalCSS.modalBackground}>
          <View style={GlobalCSS.modalContent}>
            <View style={GlobalCSS.modalHeader}>
              <Text style={{ fontSize: 18, fontWeight: 900 }}>Add Customer</Text>
              <TouchableOpacity onPress={() => setShowCreateModel(false)}>
                <Ionicons name="close-outline" size={20} color={"#000"} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#ccc",
                padding: 4,
                borderRadius: 6,
                marginTop: 8,
              }}
            >
              <TouchableOpacity onPress={() => setPanel("new")}>
                <View
                  style={[
                    { minWidth: "50%", borderRadius: 5, padding: 5 },
                    panel == "new" && { backgroundColor: "#fff" },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>New</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPanel("activate")}>
                <View
                  style={[
                    { minWidth: "50%", borderRadius: 5, padding: 5 },
                    panel == "activate" && { backgroundColor: "#fff" },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>Activate</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ maxHeight: 290, minHeight: 290 }}>
              {panel == "new" && (
                <>
                  <View style={GlobalCSS.modalBody}>
                    <Text
                      style={{ fontSize: 16, fontWeight: 500, marginBottom: 5 }}
                    >
                      Fill out customer details
                    </Text>
                    <View style={GlobalCSS.formInputContainer}>
                      <TextInput
                        style={{
                          marginLeft: 10,
                          flex: 1,
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        value={businessName}
                        onChangeText={setBusinessName}
                        placeholder="Business Name"
                      />
                    </View>
                    <View style={GlobalCSS.formInputContainer}>
                      <TextInput
                        style={{
                          marginLeft: 10,
                          flex: 1,
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        value={customerName}
                        onChangeText={setCustomerName}
                        placeholder="Customer Name"
                      />
                    </View>
                    <View style={GlobalCSS.formInputContainer}>
                      <TextInput
                        style={{
                          marginLeft: 10,
                          flex: 1,
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        value={contact}
                        onChangeText={setContact}
                        placeholder="Contact (Whatsapp prefered)"
                      />
                    </View>
                    <View style={GlobalCSS.formInputContainer}>
                      <TextInput
                        style={{
                          marginLeft: 10,
                          flex: 1,
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Address (optional)"
                      />
                    </View>
                  </View>
                  <View style={GlobalCSS.modalFooter}>
                    <TouchableOpacity>
                      <View style={GlobalCSS.primaryButton}>
                        <Text
                          style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}
                        >
                          + Create
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {panel == "activate" && (
                <View>
                  <View style={{padding: 5, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginVertical: 5, }}>
                    <TextInput 
                      style={{marginLeft: 10}}
                      value={searchText}
                      onChangeText={(text) => {
                        setSearchText(text)
                      }}
                      placeholder="Search customers" />
                  </View>
                  <View style={{ minHeight: 218, maxHeight: 218 }}>
                    <ScrollView>
                      {filterDeactivatedCustomers &&
                        filterDeactivatedCustomers.map((customer, index) => (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              borderWidth: 1,
                              borderColor: "#ccc",
                              padding: 10,
                              marginVertical: 2,
                              borderRadius: 10,
                              alignItems: "center",
                            }}
                          >
                            <View style={{}}>
                              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                                {customer.businessName}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#8e8e8e",
                                }}
                              >
                                {customer.fullName}
                              </Text>
                            </View>
                            <View>
                              <TouchableOpacity>
                                <View style={GlobalCSS.primaryButton}>
                                  <Text
                                    style={{ textAlign: "center", color: "#fff" }}
                                  >
                                    Activate
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };