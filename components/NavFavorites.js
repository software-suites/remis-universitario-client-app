import { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'twrnc'

const data = [
  {
    id: 1,
    icon: 'home',
    location: 'Casa',
    type: 1, // home
    destination: {
      description:
        'Alberdi 2678, Bahia Blanca, Provincia de Buenos Aires, Argentina',
      location: { lat: -38.7380994, lng: -62.2330724 }
    }
  },
  {
    id: 2,
    icon: 'briefcase',
    location: 'Trabajo',
    type: 2, // work
    destination: {
      description:
        'Drago 45, Bahia Blanca, Provincia de Buenos Aires, Argentina',
      location: { lat: -38.7195772, lng: -62.2671463 }
    }
  }
]

const NavFavorites = ({ onRowPress }) => {
  const [selected, setSelected] = useState()
  const handlePress = (destination, id) => {
    onRowPress(destination)
    setSelected(id)
  }
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={(tw`bg-gray-200`, { height: 0.5 })} />
      )}
      renderItem={({ item: { id, location, destination, icon } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-4 ${
            id === selected ? 'bg-slate-100' : ''
          }`}
          onPress={() => handlePress(destination, id)}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination?.description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavorites
