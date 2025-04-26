import { View, Text, ScrollView } from "react-native"
import { GlobalCSS } from "../../../../GlobalCSS"
import Summary from "./Summary";

export default function Dashboard() {


  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  const formattedDate = now.toLocaleDateString('en-US', options);

  return (
    <View style={GlobalCSS.screen}>
      <ScrollView>
        <View style={GlobalCSS.screenHeader}>
          <Text style={GlobalCSS.screenHeaderText}>Dashboard</Text>
          <Text style={GlobalCSS.screenHeaderDate}>{formattedDate}</Text>
        </View>
        <Summary />
      </ScrollView>
    </View>
  )
}
