import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import MapView from 'react-native-maps'

import { deletePlace } from '../store/actions/places'
import Icon from '../../node_modules/react-native-vector-icons/Ionicons'


const PlaceDetail = (props) => {
   const [viewMode, setViewMode] = useState(Dimensions.get('window').height > 500 ? 'portrait' : 'landscape')
   
   useEffect(() => {
      Navigation.mergeOptions(props.componentId, {
         topBar: {
            title: {
               text: props.selectedPlace.name
            },
            leftButtons: [],
            backButton: {
               visible: true
            }
         },
      })
      const handler = (dims) => setViewMode(dims.window.height > 500 ? 'portrait' : 'landscape')
      Dimensions.addEventListener('change', handler)

      return () => {
         Dimensions.removeEventListener('change', handler)
      }
   }, [])

   const handleDelete = () => {
      props.deletePlace(props.selectedPlace.key)
      Navigation.pop(props.componentId)
   }

   return (
      <View style={[styles.container, viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
         <View style={[styles.placeContainer, viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
            <Image style={styles.placeItem} source={props.selectedPlace.image} />
            <MapView
               style={styles.placeItem}
               initialRegion={{
                  latitude: props.selectedPlace.location.latitude,
                  longitude: props.selectedPlace.location.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.02
               }}
            >
               <MapView.Marker coordinate={props.selectedPlace.location} />
            </MapView>
         </View>

         <View style={styles.detailsContainer}>
            <Text style={styles.placeName}>{props.selectedPlace.name}</Text>

            <View style={styles.buttonContainer}>
               <TouchableOpacity onPress={() => handleDelete()}>
                  <Icon
                     size={30}
                     name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                     color="red"
                  />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 22
   },
   portraitContainer: {
      flexDirection: 'column',
   },
   landscapeContainer: {
      flexDirection: 'row',
   },
   placeContainer: {
      flex: 2
   },
   detailsContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
   },
   placeItem: {
      flex: 1
   },
   placeName: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 24
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   }
})

const mapDispatchToProps = dispatch => ({
   deletePlace: (placeKey) => dispatch(deletePlace(placeKey))
})

export default connect(null, mapDispatchToProps)(PlaceDetail)