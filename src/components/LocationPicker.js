import React, { useState } from 'react'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'


const LocationPicker = ({ handlePickedLocation }) => {
   const [focusedLocation, setFocusedLocation] = useState({
      latitude: 25.799511,
      longitude: -80.197520,
      latitudeDelta: 0.02,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.02
   })
   const [locationChosen, setLocationChosen] = useState(false)
   let map = React.createRef()

   const handleLocationPick = (e) => {
      const latitude = e.nativeEvent.coordinate.latitude
      const longitude = e.nativeEvent.coordinate.longitude
      map.current.animateToRegion({
         ...focusedLocation,
         latitude,
         longitude
      })
      setFocusedLocation({
         ...focusedLocation,
         latitude,
         longitude
      })
      setLocationChosen(true)
      handlePickedLocation({
         latitude,
         longitude
      })
   }

   const handleGetLocation = () => {
      navigator.geolocation.getCurrentPosition(pos => {
         handleLocationPick({
            nativeEvent: {
               coordinate: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude
               }
            }
         })
      }, err => {
         console.log(err)
         alert('Fetching location failed. Please enter manually')
      })
   }

   return (
      <View style={styles.container}>
         <MapView 
            style={styles.map}
            initialRegion={focusedLocation}
            onPress={(e) => handleLocationPick(e)}
            ref={map}
         >
            {locationChosen && (
               <MapView.Marker coordinate={focusedLocation}/>
            )}
         </MapView>

         <View style={styles.button}>
            <Button title="Locate Me" onPress={() => handleGetLocation()}/>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      alignItems: 'center'
   },
   map: {
      width: "100%",
      height: 250
   },
   button: {
      margin: 8
   }
})

export default LocationPicker 