import React from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import Icon from '../../node_modules/react-native-vector-icons/Ionicons'


const SideDrawer = props => {
   return (
      <View style={styles.container}>
         <TouchableOpacity>
            <View style={styles.drawerItem}>
               <Icon 
                  style={styles.drawerItemIcon} 
                  name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                  size={30} 
                  color="#aaa"
               />
               <Text>Logout</Text>
            </View>            
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white'
   },
   drawerItem: {
      flexDirection: "row",
      alignItems: "center"
   },
   drawerItemIcon: {
      marginRight: 5
   }
})

export default SideDrawer