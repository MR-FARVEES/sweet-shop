import { View, Text, ScrollView } from "react-native";
import { GlobalCSS } from "../../../../GlobalCSS";

export default function Invoice() {
  return (
    <View style={GlobalCSS.screen}>
      <ScrollView>
        <View style={GlobalCSS.screenHeader}>
          <Text style={GlobalCSS.screenHeaderText}>Sales</Text>
        </View>
      </ScrollView>
    </View>
  );
}
