import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'


const LocationPicker = (props) => {
   return (
      <View style={styles.container}>
         <View style={styles.placeholder}>
            <Text>Map</Text>
         </View>

         <View style={styles.button}>
            <Button title="Locate Me" onPress={() => alert('location picked!')}/>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '80%',
      alignItems: 'center'
   },
   placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "100%",
      height: 150
   },
   button: {
      margin: 8
   }
})

export default LocationPicker 