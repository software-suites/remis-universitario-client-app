import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import tw from 'tailwind-react-native-classnames'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { GOOGLE_MAPS_API_KEY } from '@env'
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from './NavFavorites'
import { Icon, Input } from 'react-native-elements'

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hola!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="A donde vas?"
            styles={{
              container: {
                flex: 0,
                paddingTop: 20
              },
              textInput: {
                backgroundColor: '#efefef',
                borderRadius: 0,
                fontSize: 18
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0
              }
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
            enablePoweredByContainer={false}
            minLength={5}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'es',
              components: 'country:ar'
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description
                })
              )
              navigation.navigate('RideOptionsCard')
            }}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tw`flex flex-row justify-between bg-blue-800 w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Viajes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-2 py-3 rounded-full`}
        >
          <Icon name="fast-food-outline" type="ionicon" color="red" size={16} />
          <Text style={tw`text-center`}>Paquetes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const styles = StyleSheet.create({})
