import { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation
} from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEY } from '@env'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const [update, setUpdate] = useState(false)

  const mapRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination, update])

  useEffect(() => {
    if (!origin || !destination) return

    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
          setUpdate(!update)
        })
    }

    getTravelTime()
  }, [origin, destination, GOOGLE_MAPS_API_KEY])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
    >
      {origin && destination ? (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="blue"
        />
      ) : null}
      {origin?.location ? (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Desde"
          description={origin.description}
          identifier="origin"
        />
      ) : null}
      {destination?.location ? (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="Hasta"
          description={destination.description}
          identifier="destination"
        />
      ) : null}
    </MapView>
  )
}

export default Map
