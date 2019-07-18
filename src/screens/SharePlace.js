import React, { useState } from 'react'
import { View, ScrollView, Button, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { addPlace } from '../store/actions/places'
import PlaceInput from '../components/PlaceInput'
import LocationPicker from '../components/LocationPicker'
import ImagePicker from '../components/ImagePicker'
import H1Text from '../components/UI/H1Text'
import imagePlaceholder from '../assets/bg.jpg'

let schema = yup.object().shape({
   placeName: yup.string().required('Required')
})

const SharePlaceScreen = (props) => {
   const [placeName, setPlaceName] = useState('')

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

   const handlePlaceNameChange = val => {
      setPlaceName(val)
   }

   const handleAddPlace = () => {
      if (placeName.trim() !== '') {
         props.addPlace(placeName)
         setPlaceName('')
      }
   }

   return (
      <ScrollView>
         <KeyboardAvoidingView style={styles.container}>
            <H1Text>Share a place with us!</H1Text>
            
            <ImagePicker source={imagePlaceholder}/>
            
            <LocationPicker />

            <View style={styles.inputContainer}>
               <PlaceInput 
                  placeName={placeName} 
                  onChangeText={handlePlaceNameChange}
               />
               <View style={styles.button}>
                  <Button
                     title="Share"
                     disabled={!placeName.trim()}
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
   addPlace: (placeName) => dispatch(addPlace(placeName))
})

export default connect(undefined, mapDispatchToProps)(SharePlaceScreen)