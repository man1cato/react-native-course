import React from 'react'
import { View, ScrollView, Button, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import { addPlace } from '../store/actions/places'
import PlaceInput from '../components/PlaceInput'
import LocationPicker from '../components/LocationPicker'
import ImagePicker from '../components/ImagePicker'

import H1Text from '../components/UI/H1Text'
import imagePlaceholder from '../assets/bg.jpg'


class SharePlaceScreen extends React.Component {
   state = {
      placeName: ''
   }

   componentDidMount() {
      this.navigationEventListener = Navigation.events().bindComponent(this)
   }   

   navigationButtonPressed({ buttonId }) {
      if (buttonId === 'leftDrawerButton') {
         Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
               left: { 
                  visible: true
               }
            }
         })
      }
   }

   handlePlaceNameChange = val => {
      console.log('FROM HANDLER: ', val)
      this.setState({ placeName: val })
   }

   handleAddPlace = () => {
      if (this.state.placeName.trim() !== '') {
         this.props.addPlace(this.state.placeName)
         this.setState({ placeName: '' })
      }
   }

   render () {
      return (
         <ScrollView>
            <View style={styles.container}>
               <H1Text>Share a place with us!</H1Text>
               
               <ImagePicker source={imagePlaceholder}/>
               
               <LocationPicker />

               <View style={styles.inputContainer}>
                  <PlaceInput 
                     placeName={this.state.placeName} 
                     onChangeText={this.handlePlaceNameChange}
                  />
                  <View style={styles.button}>
                     <Button
                        title="Share"
                        onPress={this.handleAddPlace}
                     />
                  </View>
               </View>

            </View>
         </ScrollView>
      )
   }
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