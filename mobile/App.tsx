import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { GlobalCSS } from './GlobalCSS';

export default function App() {
  return (
    <View style={GlobalCSS.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
