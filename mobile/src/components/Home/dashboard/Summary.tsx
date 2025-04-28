import { View, Text } from "react-native"
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { GlobalCSS } from "../../../../GlobalCSS"
import { NativeDropDownProps } from "../../../interface/DropDown"
import { useEffect, useState } from "react"
import DropDown from "../../util/DropDown"
import { InvoiceProps } from "../../../interface/Invoice"
import { ExpenseProps } from "../../../interface/Expense"

interface Options {
  setFilterOption: (value: string) => void
  invoicesData: InvoiceProps[]
  expenseData: ExpenseProps[]
}

const options: NativeDropDownProps[] = [
  {label: 'Year', value: 'year'},
  {label: 'Month', value: 'month'},
  {label: 'Today', value: 'day'},
  {label: 'All', value: 'all'}
]

export default function Summary({ setFilterOption, invoicesData, expenseData  }: Options) { 
  const [selected, setSelected] = useState<NativeDropDownProps>(options[1])
  const [invoiceCount, setInvoiceCount] = useState<number>(0)
  const [expense, setExpense] = useState<number>(0)
  const [profit, setProfit] = useState<number>(0)
  const [netIncome, setNetIncome] = useState<number>(0)
  
  useEffect(() => {
    setFilterOption(selected.value)
  }, [selected])

  useEffect(() => {
    let totalInvoice = 0;
    let totalProfit = 0;
    let totalExpense = 0;

    invoicesData.forEach(invoice => {
      totalInvoice += 1;
      totalProfit += invoice.amount;
    });

    expenseData.forEach(expenseItem => {
      totalExpense += expenseItem.price;
    });

    setInvoiceCount(totalInvoice);
    setProfit(totalProfit);
    setExpense(totalExpense);
    setNetIncome(totalProfit - totalExpense);
  }, [invoicesData, expenseData])
  
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
              <Text style={GlobalCSS.columnContentTextHighlight}>{invoiceCount}</Text>
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
              <Text style={GlobalCSS.columnContentTextHighlight}>Rs. {expense}</Text>
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
              <Text style={GlobalCSS.columnContentTextHighlight}>Rs. {profit}</Text>
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
              <Text style={GlobalCSS.columnContentTextHighlight}>Rs. {netIncome}</Text>
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