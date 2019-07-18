import React from 'react'
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native'


const DefaultButton = props => {
   const content = (
      <View style={[styles.button, { backgroundColor: props.color }, props.disabled && styles.disabled]}>
         <Text style={styles.text}>
            {props.children}
         </Text>
      </View>
   )
   if (props.disabled) {
      return content
   }

   if (Platform.OS === 'android') {
      return (
         <TouchableNativeFeedback onPress={props.onPress}>
            {content}
         </TouchableNativeFeedback>
      )
   }
   return (
      <TouchableOpacity onPress={props.onPress}>
         {content}
      </TouchableOpacity>
   )
}
const styles = StyleSheet.create({
   text: { 
      color: "white", 
      textTransform: "uppercase" 
   },
   button: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      padding: 10,
      margin: 5
   }, 
   disabled: {
      backgroundColor: '#ddd',
      borderColor: '#ddd'
   }
})

export default DefaultButton