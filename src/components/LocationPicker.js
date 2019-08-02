import React from 'react'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'


class LocationPicker extends React.Component {
   constructor(props) {
      super(props)
      this.map = React.createRef()
      this.state = {
         focusedLocation: {
            latitude: 25.799511,
            longitude: -80.197520,
            latitudeDelta: 0.02,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.02
         },
         locationChosen: false
      } 
   }

   reset = () => {
      this.setState({
         focusedLocation: {
            latitude: 25.799511,
            longitude: -80.197520,
            latitudeDelta: 0.02,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.02
         },
         locationChosen: false
      })
   }

   handleLocationPick = (e) => {
      const latitude = e.nativeEvent.coordinate.latitude
      const longitude = e.nativeEvent.coordinate.longitude
      this.map.current.animateToRegion({
         ...this.state.focusedLocation,
         latitude,
         longitude
      })
      this.setState((prevState) => ({
         focusedLocation: {
            ...prevState.focusedLocation,
            latitude,
            longitude
         },
         locationChosen: true
      }))
      this.props.handlePickedLocation({
         latitude,
         longitude
      })
   }

   handleGetLocation = () => {
      navigator.geolocation.getCurrentPosition(pos => {
         this.handleLocationPick({
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

   render () {
      return (
         <View style={styles.container}>
            <MapView 
               style={styles.map}
               initialRegion={this.state.focusedLocation}
               region={!this.state.locationChosen ? this.state.focusedLocation : null}
               onPress={this.handleLocationPick}
               ref={this.map}
            >
               {this.state.locationChosen && (
                  <MapView.Marker coordinate={this.state.focusedLocation}/>
               )}
            </MapView>
   
            <View style={styles.button}>
               <Button title="Locate Me" onPress={this.handleGetLocation}/>
            </View>
         </View>
      )
   }
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