import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "./components/SafeScreen";

export default function RootLayout() {
  return ( 
  <SafeAreaProvider>
    <SafeScreen>


 <Stack screenOptions={{headerShown:false, headerTitleAlign:"center"}}>
<Stack.Screen name="index"></Stack.Screen>
<Stack.Screen name="(auth)"></Stack.Screen>
<Stack.Screen name="signup"></Stack.Screen>




  </Stack>
    </SafeScreen>

  </SafeAreaProvider>
 )
}
