import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Icon from '../../node_modules/react-native-vector-icons/Ionicons'

const startMainTabs = async () => {
   const iconPrefix = Platform.OS === 'android' ? 'md-' : 'ios-'
   const mapIcon = await Icon.getImageSource(iconPrefix + 'map', 30)
   const shareIcon = await Icon.getImageSource(iconPrefix + 'share-alt', 30)
   const hamburger = await Icon.getImageSource(iconPrefix + 'menu', 30)
   const menuButton = {
      id: 'leftDrawerButton',
      icon: hamburger,
      testID: 'LEFT_DRAWER_BUTTON',
      showAsAction: 'always'
   }

   Navigation.setDefaultOptions({
      topBar: {
         leftButtons: [
            menuButton
         ],
         leftButtonColor: 'orange'
      },
      bottomTab: {
         selectedIconColor: 'orange'
      }
   })

   Navigation.setRoot({
      root: {
         sideMenu: {
            left: {
               component: {
                  name: 'awesome-places.SideDrawer',
                  id: 'leftDrawer'
               }
            }, 
            center: {
               bottomTabs: {
                  children: [{
                     stack: {
                        children: [{
                           component: {
                              name: 'awesome-places.FindPlaceScreen',
                              passProps: {
                                 text: 'This is tab 1'
                              }
                           }
                        }],
                        options: {
                           topBar: {
                              title: {
                                 text: 'Find Place'
                              }
                           },
                           bottomTab: {
                              text: 'Find Place',
                              icon: mapIcon,
                              testID: 'FIRST_TAB_BAR_BUTTON'
                           }
                        }
                     }
                  },
                  {
                     stack: {
                        children: [{
                           component: {
                              name: 'awesome-places.SharePlaceScreen',
                              passProps: {
                                 text: 'This is tab 2'
                              }
                           }
                        }],
                        options: {
                           topBar: {
                              title: {
                                 text: 'Share Place'
                              }
                           },
                           bottomTab: {
                              text: 'Share Place',
                              icon: shareIcon,
                              testID: 'SECOND_TAB_BAR_BUTTON'
                           }
                        }
                     }
                  }]
               }
            } 
         }
      }
   })
}

export default startMainTabs