import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons'
import { deletePlace } from '../store/actions/places'


const PlaceDetail = (props) => {
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
   }, [])

   const handleDelete = () => {
      props.deletePlace(props.selectedPlace.key)
      Navigation.pop(props.componentId)
   }

   return (
      <View style={styles.container}>
         <Image source={props.selectedPlace.image} style={styles.placeImage}/>
         <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
         <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleDelete()}>
               <Icon size={30} name="trash-can-outline" color="red" />
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      margin: 22
   },
   placeImage: {
      height: 200,
      width: '100%'
   }, 
   placeName: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 28
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