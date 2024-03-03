import { Image, SafeAreaView, View } from 'react-native'
import tw from 'twrnc'

import NavOptions from '../components/NavOptions'
import NavFavorites from '../components/NavFavorites'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API_KEY } from '@env'

import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '../slices/navSlice'

import { useRef } from 'react'

const logo = require('../assets/logo.png')

const HomeScreen = () => {
  const dispatch = useDispatch()

  const placesRef = useRef(null)

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover'
          }}
          source={logo}
        />

        <GooglePlacesAutocomplete
          ref={placesRef}
          placeholder="Desde donde?"
          styles={{
            container: {
              flex: 0
            },
            textInput: { fontSize: 18 }
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={500}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'es',
            components: 'country:ar'
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description
              })
            )
            dispatch(setDestination(null))
          }}
        />
        <NavOptions />

        <NavFavorites
          onRowPress={({ location, description }) => {
            dispatch(setDestination(null))

            dispatch(
              setOrigin({
                location,
                description
              })
            )

            placesRef?.current.setAddressText(description)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
