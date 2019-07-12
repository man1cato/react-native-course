import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const SideDrawer = () => {
   return (
      <View style={styles.container}>
         <Text>Sidedrawer</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 22,
      backgroundColor: 'white'
   }
})

export default SideDrawer