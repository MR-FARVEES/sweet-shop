import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, RefreshControl } from 'react-native'
import { GlobalCSS } from '../../../../GlobalCSS'
import { useEffect, useState } from 'react'
import { InvoiceProps } from '../../../interface/Invoice'
import { ExpenseProps } from '../../../interface/Expense'
import { Feather } from '@expo/vector-icons'
import DropDown from '../../util/DropDown'
import { NativeDropDownProps } from '../../../interface/DropDown'

const apiEndpiont = 'http://172.20.26.233/api/invoice/'

const items: NativeDropDownProps[] = [
  {label: 'All', value: 'all'},
  {label: 'Complete', value: 'complete'},
  {label: 'Pending', value: 'pending'}
]

const InvoicesPanel = ({ invoices }: { invoices: InvoiceProps[] }) => {
  return (
    <View style={{ minHeight: 320, maxHeight: 320, paddingHorizontal: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,.1)', borderRadius: 6, marginTop: 5 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 1 }}>
        <View style={{ marginTop: 5 }}>
          {invoices.length > 0 ? (
            invoices.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
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

const ExpensePanel = ({ expense }: { expense: ExpenseProps[] }) => {
  return (
    <View style={{ minHeight: 320, maxHeight: 320, paddingHorizontal: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,.1)', borderRadius: 6, marginTop: 5 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 1 }}>
        <View style={{ marginTop: 5 }}>
          {expense.length > 0 ? (
            expense.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
                <View style={{}}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.item}</Text>
                  <Text style={{ color: '#8e8e8e' }}>{item.location}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>Rs. {item.price}/-</Text>
                  <Text style={{ color: '#8e8e8e' }}>{item.date}</Text>
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

const ProfitPanel = ({ invoices, expense } : { invoices : InvoiceProps[], expense: ExpenseProps[] }) => {
  const [profit, setProfit] = useState<number>(0)
  const calculateProfit = () => {
    let Prof = 0;
    let Expe = 0;
    invoices.map((invoice) => {
      Prof += invoice.amount
    })
    expense.map((exp) => {
      Expe += exp.price
    })
    setProfit(Prof - Expe)
  }

  useEffect(() => {
    calculateProfit()
  }, [])

  return (
    <View style={{minHeight: 320, maxHeight: 320, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginTop: 5}}>
      <View>
        <Text style={[GlobalCSS.incrementText, {textAlign: 'center', fontSize: 40, fontWeight: 900}]}>Rs. {profit}</Text>
        <Text style={{textAlign: 'center', color: '#8e8e8e', fontSize: 16}}>Total Profit ({'April'})</Text>
        <View style={{flexDirection: 'row'}}>
          <Feather name='arrow-up-right' style={[GlobalCSS.incrementText, {}]} size={15} />
          <Text style={[GlobalCSS.incrementText, {marginLeft: 5, textAlign: 'center'}]}>{8.1}% increased from last month</Text>
        </View>
      </View>
    </View>
  )
}

export default function SummaryDetails({ invoicesData, expenseData }: { invoicesData: InvoiceProps[], expenseData: ExpenseProps[] }) {
  const [select, setSelect] = useState<NativeDropDownProps>(items[0])
  const [panel, setPanel] = useState<string>('invoice')
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceProps[]>([])

  const handlePanelSelection = (panel: string) => {
    setPanel(panel)
  }

  useEffect(() => {
    if (select.value == 'all') {
      setFilteredInvoices(invoicesData)
    } else {
      const filtered = invoicesData.filter((invoice) => invoice.status == select.value)
      setFilteredInvoices(filtered)
    }
  }, [select])

  return (
    <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
      { panel == 'invoice' && (
          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text>Filter By</Text>
              <DropDown items={items} selected={select} setSelected={setSelect} />
            </View>
          </View>
      )}
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
        { panel == 'invoice' && <InvoicesPanel invoices={filteredInvoices}/>}
        { panel == 'expense' && <ExpensePanel expense={expenseData}/> }
        { panel == 'profit'  && <ProfitPanel invoices={invoicesData} expense={expenseData}/>  }
      </View>
    </View>
  )
}