import React from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import PlaceInput from '../components/PlaceInput'
import { addPlace } from '../store/actions/places'


class SharePlaceScreen extends React.Component {

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

   handleSubmit = placeName => {
      this.props.addPlace(placeName)
   }

   render () {
      return (
         <View>
            <PlaceInput handleSubmit={this.handleSubmit} />
         </View>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   addPlace: (placeName) => dispatch(addPlace(placeName))
})

export default connect(undefined, mapDispatchToProps)(SharePlaceScreen)