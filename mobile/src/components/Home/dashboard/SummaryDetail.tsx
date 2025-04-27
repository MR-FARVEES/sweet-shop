import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, RefreshControl } from 'react-native'
import { GlobalCSS } from '../../../../GlobalCSS'
import { useEffect, useState } from 'react'
import { InvoiceProps } from '../../../interface/Invoice'
import { ExpenseProps } from '../../../interface/Expense'

const apiEndpiont = 'http://172.20.26.233/api/invoice/'
const now = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})
let invoiceCache: InvoiceProps[] = []
const invoiceData: InvoiceProps[] = [
    {iid: 'INV-250427-00001', customer: 'Raj Sweets', amount: 12000, date: now, status: 'complete'},
    {iid: 'INV-250427-00002', customer: 'Patel Store', amount: 9500, date: now, status: 'pending'},
    {iid: 'INV-250427-00003', customer: 'Sharma Bakery', amount: 13000, date: now, status: 'pending'},
    {iid: 'INV-250427-00004', customer: 'Althaf Hotel', amount: 32000, date: now, status: 'pending'},
]
const expenseData: ExpenseProps[] = [
    {item: 'Sugar', location: 'Wholesale Market', date: now, price: 5000},
    {item: 'Milk Supply', location: 'Diry Farm', date: now, price: 9000},
    {item: 'Packagin', location: 'Box Suppliers', date: now, price: 300},
]

const InvoicesPanel = ({ invoices }: { invoices: InvoiceProps[] }) => {
  return (
    <View style={{ maxHeight: 300, paddingHorizontal: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,.1)', borderRadius: 6, marginTop: 5 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 1 }}>
        <View style={{ marginTop: 5 }}>
          {invoices.length > 0 ? (
            invoices.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderColor: "#ccc" }}>
                <View style={{}}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.iid}</Text>
                  <Text style={{ color: '#8e8e8e' }}>{item.customer}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>Rs. {item.amount}/-</Text>
                  <Text style={{ color: '#8e8e8e' }}>{item.date}</Text>
                  <Text style={[item.status == 'complete' ? GlobalCSS.incrementText : GlobalCSS.decrementText]}>{item.status}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={"large"} color={"#007AFF"}/>
              <Text style={{ textAlign: 'center', marginLeft: 10}}>Loading invoices.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const ExpensePanel = () => {
  return (
    <View>
      <Text>Expense</Text>
    </View>
  )
}

const ProfitPanel = () => {
  return (
    <View>
      <Text>Profit</Text>
    </View>
  )
}

export default function SummaryDetails() {
  const [panel, setPanel] = useState<string>('invoice')
  const [invoices, setInvoices] = useState<InvoiceProps[]>([])

  const fetchInvoices = () => {
    setInvoices(invoiceData)
  }
  const handlePanelSelection = (panel: string) => {
    setPanel(panel)
  }

  useEffect(() => {
    fetchInvoices()

    const timer = setInterval(() => {
      fetchInvoices()
    }, 300000)

    return () => clearInterval(timer)
  }, [])

  return (
    <View style={{padding:10}}>
      <View style={GlobalCSS.topNavBar}>
        <TouchableOpacity onPress={() => handlePanelSelection('invoice')}>
          <View style={[GlobalCSS.topNavBarMenu, panel == 'invoice' && {backgroundColor: '#fff'}]}>
            <Text style={GlobalCSS.topNavBarMenuText}>Invoice</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePanelSelection('expense')}>
          <View style={[GlobalCSS.topNavBarMenu, panel == 'expense' && {backgroundColor: '#fff'}]}>
            <Text style={GlobalCSS.topNavBarMenuText}>Expense</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePanelSelection('profit')}>
          <View style={[GlobalCSS.topNavBarMenu, panel == 'profit' && {backgroundColor: '#fff'}]}>
            <Text style={GlobalCSS.topNavBarMenuText}>Profit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        { panel == 'invoice' && <InvoicesPanel invoices={invoices}/>}
        { panel == 'expense' && <ExpensePanel /> }
        { panel == 'profit'  && <ProfitPanel />  }
      </View>
    </View>
  )
}