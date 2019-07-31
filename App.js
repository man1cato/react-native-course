import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth'
import SharePlaceScreen from './src/screens/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace'
import PlaceDetailScreen from './src/screens/PlaceDetail'
import SideDrawer from './src/screens/SideDrawer'

import configureStore from './src/store/configureStore'


const store = configureStore()

const ReduxScreen = (Component, props) => (
  <Provider store={store} >
    <Component {...props} />
  </Provider>
)

//Register screens
Navigation.registerComponent('awesome-places.AuthScreen', () => props => ReduxScreen(AuthScreen, props))
Navigation.registerComponent('awesome-places.SharePlaceScreen', () => props => ReduxScreen(SharePlaceScreen, props))
Navigation.registerComponent('awesome-places.FindPlaceScreen', () => props => ReduxScreen(FindPlaceScreen, props))
Navigation.registerComponent('awesome-places.PlaceDetailScreen', () => props => ReduxScreen(PlaceDetailScreen, props))
Navigation.registerComponent('awesome-places.SideDrawer', () => props => ReduxScreen(SideDrawer, props))


// Start app
export default () => Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'awesome-places.AuthScreen',
          passProps: {
            text: 'stack with one child'
          }
        }
      }],
      options: {
        topBar: {
          title: {
            text: 'Login'
          },
          leftButtons: []
        }
      }
    }
  }
})
