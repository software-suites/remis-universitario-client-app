import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: 1,
    title: 'Estandar',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 2,
    title: 'Ejecutivo',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 3,
    title: 'De-Luxe',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  }
]

const CHARGE_RATE = 400

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => {
            navigation.navigate('NavigateCard')
          }}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Elegi un vehiculo - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && 'bg-gray-200'
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS'
              }).format(
                (CHARGE_RATE *
                  travelTimeInformation?.duration.value *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-red-800 py-3 m-3 rounded-full ${
            !selected && 'bg-gray-300'
          }`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Confirma el vehiculo {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard
