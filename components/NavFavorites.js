import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
  {
    id: 1,
    icon: 'home',
    location: 'Casa',
    destination:
      'Alberdi 2678, Bahia Blanca, Provincia de Buenos Aires, Argentina'
  },
  {
    id: 2,
    icon: 'briefcase',
    location: 'Trabajo',
    destination: 'Drago 45, Bahia Blanca, Provincia de Buenos Aires, Argentina'
  }
]

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={(tw`bg-gray-200`, { height: 0.5 })} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-4`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavorites

const styles = StyleSheet.create({})
