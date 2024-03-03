import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
  {
    id: 123,
    title: 'Vamos!',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen'
  }
]

const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-4 m-2 ${!origin ? '' : 'bg-blue-100'}`}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View style={tw`${!origin ? 'opacity-20' : ''}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
            <Text style={tw`m-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-blue-700 rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions
