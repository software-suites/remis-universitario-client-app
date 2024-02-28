import { TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'

const MapScreen = () => {
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(setDestination(null))
          navigation.navigate('HomeScreen')
        }}
        style={tw`bg-gray-100 absolute top-16  left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="home" />
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen
