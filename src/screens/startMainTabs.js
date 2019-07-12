import { Navigation } from 'react-native-navigation'
import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons'


const startMainTabs = async () => {
   const mapIcon = await Icon.getImageSource('map-search', 30)
   const shareIcon = await Icon.getImageSource('share', 30)
   const hamburger = await Icon.getImageSource('menu', 30)
   const menuButton = {
      id: 'leftDrawerButton',
      icon: hamburger,
      testID: 'LEFT_DRAWER_BUTTON',
      showAsAction: 'always'
   }

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
                              },
                              leftButtons: [
                                 menuButton
                              ]
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
                              },
                              leftButtons: [
                                 menuButton
                              ]
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