import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { GlobalCSS } from "../../../GlobalCSS";
import { NativeDropDownProps } from "../../interface/DropDown";
import { useState } from "react";

interface NativeProps {
   items: NativeDropDownProps[];
   selected: NativeDropDownProps;
   setSelected: (value: NativeDropDownProps) => void;
}

export default function DropDown({ items, selected, setSelected }: NativeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleSelection = (item: NativeDropDownProps) => {
    setSelected(item)
    setIsOpen(false)
  }

  return (
    <View style={{marginLeft: 5}}>
      <TouchableOpacity onPress={() => setIsOpen(prev => !prev)}>
        <View style={GlobalCSS.dropDownContainer}>
          <Text style={[isOpen && {color: '#ccc'}]}>{isOpen ? '-- Select --' : selected.label}</Text>
        </View>
      </TouchableOpacity>
      { isOpen && (
        <View style={GlobalCSS.dropDownListContainer}>
          <FlatList 
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelection(item)}>
                <View style={[item.value == selected.value && {backgroundColor: '#008bfc'}, {borderRadius:5}]}>
                  <Text style={[item.value == selected.value && {color: '#fff'}, {padding: 3, paddingLeft: 5}]}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )} />
        </View>
      )}
    </View>
  );
}
