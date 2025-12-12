import { View, Text,TouchableOpacity } from 'react-native'

import COLORS from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'

export default function Home () {
const {user,logout}=useAuthStore();



  return (
    <View>
      <Text style={{color:COLORS.black}}>Home Tab</Text>
       <TouchableOpacity onPress={logout} >
        <Text>Logout {user?.username}</Text>
      </TouchableOpacity>

    </View>
  )
}