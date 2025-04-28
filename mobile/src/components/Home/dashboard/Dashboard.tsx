import { View, Text, ScrollView } from "react-native"
import { GlobalCSS } from "../../../../GlobalCSS"
import Summary from "./Summary";
import SummaryDetails from "./SummaryDetail";
import { useEffect, useState } from "react";
import { InvoiceProps } from "../../../interface/Invoice";
import { ExpenseProps } from "../../../interface/Expense";

const today = new Date()
const day = today.getDate()
const month = today.toLocaleString('default', { month: 'long' })
const year = today.getFullYear()

const now = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const invoiceData: InvoiceProps[] = [
    {iid: 'INV-250427-00001', customer: 'Raj Sweets', amount: 12000, date: '27 Apr 2025', status: 'complete'},
    {iid: 'INV-250427-00002', customer: 'Patel Store', amount: 9500, date: now, status: 'pending'},
    {iid: 'INV-250427-00003', customer: 'Sharma Bakery', amount: 13000, date: now, status: 'pending'},
    {iid: 'INV-250427-00004', customer: 'Althaf Hotel', amount: 32000, date: now, status: 'pending'},
]
const expenseData: ExpenseProps[] = [
    {eid: 'EX-250427-001', item: 'Sugar', location: 'Wholesale Market', date: now, price: 5000},
    {eid: 'EX-250427-002', item: 'Milk Supply', location: 'Diry Farm', date: now, price: 9000},
    {eid: 'EX-250427-003', item: 'Packagin', location: 'Box Suppliers', date: now, price: 300},
]

export default function Dashboard() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  const formattedDate = now.toLocaleDateString('en-US', options);
  const [filterOption, setFilterOption] = useState<string>('')

  const fetchInvoice = (option: string) => {

  }

  const fetchExpense = (option: string) => {

  }

  useEffect(() => {
    fetchInvoice(filterOption)
    fetchExpense(filterOption)
  }, [filterOption])

  return (
    <View style={GlobalCSS.screen}>
      <ScrollView>
        <View style={GlobalCSS.screenHeader}>
          <Text style={GlobalCSS.screenHeaderText}>Dashboard</Text>
          <Text style={GlobalCSS.screenHeaderRightText}>{formattedDate}</Text>
        </View>
        <Summary setFilterOption={setFilterOption} invoicesData={invoiceData} expenseData={expenseData} />
        <SummaryDetails invoicesData={invoiceData} expenseData={expenseData} />
      </ScrollView>
    </View>
  )
}
