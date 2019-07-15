import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import PlaceList from '../components/List'


const FindPlaceScreen = (props) => {
   const [placesLoaded, setPlacesLoaded] = useState(false)
   const [removeAnim] = useState(new Animated.Value(1))
   const [fadeInAnim] = useState(new Animated.Value(0))

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

   const handlePlaceLoader = () => {
      Animated.timing(fadeInAnim, {
         toValue: 1,
         duration: 500,
         useNativeDriver: true
      }).start()
   }

   const handlePlaceSearch = () => {
      Animated.timing(removeAnim, {
         toValue: 0,
         duration: 500,
         useNativeDriver: true
      }).start(() => {
         setPlacesLoaded(true)
         handlePlaceLoader()
      })
   }
  
   const handleSelect = (key) => {
      const selectedPlace = props.places.find(place => place.key === key)

      Navigation.push(props.componentId, {
         component: {
            name: 'awesome-places.PlaceDetailScreen',
            passProps: {
               selectedPlace
            }
         },
         options: {
            topBar: {
               title: {
                  text: selectedPlace.name
               }
            }
         }
      })
   }

   let content = (
      <Animated.View style={{ 
         opacity: removeAnim,
         transform: [
            {
               scale: removeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
               })
            }
         ]  
      }}>
         <TouchableOpacity onPress={() => handlePlaceSearch()}>
            <View style={styles.searchButton}>
               <Text style={styles.searchButtonText}>Find Places</Text>
            </View>
         </TouchableOpacity>
      </Animated.View>
   )

   if (placesLoaded) {
      content = (
         <Animated.View style={{ opacity: fadeInAnim }}>
            <PlaceList items={props.places} handleSelect={handleSelect} />
         </Animated.View>
      )
   }

   return (
      <View style={placesLoaded ? null : styles.buttonContainer}>
         {content}
      </View>
   )
}

const styles = StyleSheet.create({
   buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   searchButton: {
      borderColor: 'orange',
      borderWidth: 1,
      borderRadius: 100,
      padding: 20
   },
   searchButtonText: {
      color: 'orange',
      fontWeight: 'bold',
      textTransform: 'uppercase'
   }
})

const mapStateToProps = state => ({
   places: state.places.places
})

export default connect(mapStateToProps)(FindPlaceScreen)