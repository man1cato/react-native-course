import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import PlaceList from '../components/List'


class FindPlaceScreen extends React.Component {
   
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

   handleSelect = (key) => {
      const selectedPlace = this.props.places.find(place => place.key === key)  

      Navigation.push(this.props.componentId,  {
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

   render () {
      return (
         <View>
            <PlaceList items={this.props.places} handleSelect={this.handleSelect} />
         </View>
      )
   }
}

const mapStateToProps = state => ({
   places: state.places.places
})

export default connect(mapStateToProps)(FindPlaceScreen)