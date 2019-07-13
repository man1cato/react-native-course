import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from '../../node_modules/react-native-vector-icons/MaterialCommunityIcons'


const SideDrawer = () => {
   return (
      <View style={styles.container}>
         <TouchableOpacity>
            <View style={styles.drawerItem}>
               <Icon style={styles.drawerItemIcon} name="logout-variant" size={30} color="#aaa"/>
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