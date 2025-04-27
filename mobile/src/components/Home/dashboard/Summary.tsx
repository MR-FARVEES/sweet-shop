import { View, Text } from "react-native"
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { GlobalCSS } from "../../../../GlobalCSS"
import { NativeDropDownProps } from "../../../interface/DropDown"
import { useState } from "react"
import DropDown from "../../util/DropDown"

const options: NativeDropDownProps[] = [
  {label: 'Year', value: 'year'},
  {label: 'Month', value: 'month'},
  {label: 'All', value: 'all'}
]

export default function Summary() { 
  const [selected, setSelected] = useState<NativeDropDownProps>(options[1])
  
  return (
    <View>
      <View style={GlobalCSS.filterContainer}>
        <Text>Filter By</Text>
        <DropDown items={options} selected={selected} setSelected={setSelected} />
      </View>
      <View style={GlobalCSS.screenGrid}>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <Ionicons name="receipt-outline" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Invoices</Text>
            </View>
            <View style={GlobalCSS.columnContent}>
              <Text style={GlobalCSS.columnContentTextHighlight}>124</Text>
              <View style={GlobalCSS.columnContentSummaryContainer}>
                <Feather name="trending-up" size={14} style={GlobalCSS.incrementText} />
                <Text style={GlobalCSS.columnContainerSummaryText}>
                  <Text style={GlobalCSS.incrementText}>+12.8%</Text>{' '}from last month</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <MaterialIcons name="trending-down" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Expense</Text>
            </View>
            <View style={GlobalCSS.columnContent}>
              <Text style={GlobalCSS.columnContentTextHighlight}>Rs. 24000</Text>
              <View style={GlobalCSS.columnContentSummaryContainer}>
                <Feather name="trending-down" size={14} style={GlobalCSS.incrementText} />
                <Text style={GlobalCSS.columnContainerSummaryText}>
                  <Text style={GlobalCSS.incrementText}>-3.8%</Text>{' '}from last month</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <MaterialIcons name="trending-up" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Profit</Text>
            </View>
            <View style={GlobalCSS.columnContent}>
              <Text style={GlobalCSS.columnContentTextHighlight}>Rs. 38000</Text>
              <View style={GlobalCSS.columnContentSummaryContainer}>
                <Feather name="trending-up" size={14} style={GlobalCSS.incrementText} />
                <Text style={GlobalCSS.columnContainerSummaryText}>
                  <Text style={GlobalCSS.incrementText}>+13.8%</Text>{' '}from last month</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={GlobalCSS.screenGridColumnShadow}>
          <View style={GlobalCSS.screenGridColumn}>
            <View style={GlobalCSS.columnHeader}>
              <Feather name="dollar-sign" color={"#000"} size={18} />
              <Text style={GlobalCSS.columnHeaderText}>Net Income</Text>
            </View>
            <View style={GlobalCSS.columnContent}>
              <Text style={GlobalCSS.columnContentTextHighlight}>Rs. 18000</Text>
              <View style={GlobalCSS.columnContentSummaryContainer}>
                <Feather name="trending-up" size={14} style={GlobalCSS.incrementText} />
                <Text style={GlobalCSS.columnContainerSummaryText}>
                  <Text style={GlobalCSS.incrementText}>+11.8%</Text>{' '}from last month</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}