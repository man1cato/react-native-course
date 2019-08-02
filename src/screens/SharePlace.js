import React, { useState, useEffect } from 'react'
import { View, ScrollView, Button, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import { addPlace, startAddPlace } from '../store/actions/places'
import PlaceInput from '../components/PlaceInput'
import LocationPicker from '../components/LocationPicker'
import ImagePicker from '../components/ImagePicker'
import H1Text from '../components/UI/H1Text'


const SharePlaceScreen = props => {
   const [placeName, setPlaceName] = useState('')
   const [location, setLocation] = useState(null)
   const [image, setImage] = useState(null)
   let imagePickerRef = React.createRef()
   let locationPickerRef = React.createRef()

   useEffect(() => {
      const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
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
      const screenEventListener = Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
         if (componentId === props.componentId) {
            props.startAddPlace()      
         }
      })

      return () => {
         navigationButtonEventListener.remove()
         screenEventListener.remove()
      }

   }, [])



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
      setLocation(null)
      setImage(null)
      imagePickerRef.current.reset()
      locationPickerRef.current.reset()
   } 

   useEffect(() => {
      if (props.placeAdded) {
         Navigation.mergeOptions(props.componentId, {
            bottomTabs: {
               currentTabIndex: 0
            }
         })
      }
   })

   return (
      <ScrollView>
         <KeyboardAvoidingView style={styles.container}>
            <H1Text>Share a place with us!</H1Text>
            
            <ImagePicker onImagePicked={handlePickedImage} ref={imagePickerRef}/>
            
            <LocationPicker handlePickedLocation={handlePickedLocation} ref={locationPickerRef}/>

            <View style={styles.inputContainer}>
               <PlaceInput 
                  placeName={placeName} 
                  onChangeText={handlePlaceNameChange}
               />
               <View style={styles.button}>
                  {props.isLoading ? (
                     <ActivityIndicator />
                  ) : (
                     <Button
                        title="Share"
                        disabled={!placeName.trim() || !location || !image}
                        onPress={() => handleAddPlace()}
                     />
                  )}
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

const mapStateToProps = state => ({
   isLoading: state.ui.isLoading,
   placeAdded: state.places.placeAdded
})

const mapDispatchToProps = dispatch => ({
   addPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
   startAddPlace: () => dispatch(startAddPlace())
})

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)