import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Your app components go here */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
