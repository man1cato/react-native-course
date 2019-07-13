import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'


const DefaultButton = props => (
   <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, { backgroundColor: props.color }]}>
         <Text style={{color: "white", textTransform: "uppercase"}}>
            {props.children}
         </Text>
      </View>
   </TouchableOpacity>
)

const styles = StyleSheet.create({
   button: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      padding: 10,
      margin: 5
   }
})

export default DefaultButton