import { View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { GlobalCSS } from "../../../../GlobalCSS"

export default function Summary() {
  
  return (
    <View>
      <View style={GlobalCSS.screenGrid}>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <MaterialIcons name="currency-exchange" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Invoices</Text>
            </View>
          </View>
        </View>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <MaterialIcons name="currency-exchange" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Expense</Text>
            </View>
          </View>
        </View>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <MaterialIcons name="currency-exchange" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Profit</Text>
            </View>
          </View>
        </View>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <MaterialIcons name="currency-exchange" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Net Income</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}