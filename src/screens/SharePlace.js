import React, { useState } from 'react'
import { View, ScrollView, Button, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import { addPlace } from '../store/actions/places'
import PlaceInput from '../components/PlaceInput'
import LocationPicker from '../components/LocationPicker'
import ImagePicker from '../components/ImagePicker'
import H1Text from '../components/UI/H1Text'
import imagePlaceholder from '../assets/bg.jpg'


const SharePlaceScreen = (props) => {
   const [placeName, setPlaceName] = useState('')
   const [location, setLocation] = useState(null)
   const [image, setImage] = useState(null)

   Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
      if (buttonId === 'leftDrawerButton') {
         Navigation.mergeOptions(props.componentId, {
            sideMenu: {
               left: {
                  visible: true
               }
            }
         })
      }
   })   

   const handlePickedImage = image => {
      setImage(image)
   }

   const handlePickedLocation = location => {
      setLocation(location)
   }

   const handlePlaceNameChange = val => {
      setPlaceName(val)
   }

   const handleAddPlace = () => {
      props.addPlace(placeName, location, image)
      setPlaceName('')
   } 

   return (
      <ScrollView>
         <KeyboardAvoidingView style={styles.container}>
            <H1Text>Share a place with us!</H1Text>
            
            <ImagePicker source={imagePlaceholder} onImagePicked={handlePickedImage} />
            
            <LocationPicker handlePickedLocation={handlePickedLocation}/>

            <View style={styles.inputContainer}>
               <PlaceInput 
                  placeName={placeName} 
                  onChangeText={handlePlaceNameChange}
               />
               <View style={styles.button}>
                  <Button
                     title="Share"
                     disabled={!placeName.trim() || !location || !image}
                     onPress={() => handleAddPlace()}
                  />
               </View>
            </View>

         </KeyboardAvoidingView>
      </ScrollView>
   )   
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center"
   },
   inputContainer: {
      width: '80%',
      alignItems: 'center'
   },
   button: {
      width: '100%',
      minWidth: 300,
      margin: 8
   }
})

const mapDispatchToProps = dispatch => ({
   addPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
})

export default connect(undefined, mapDispatchToProps)(SharePlaceScreen)