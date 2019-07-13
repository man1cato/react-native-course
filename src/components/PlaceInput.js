import React from 'react'
import { StyleSheet } from 'react-native'

import DefaultInput from './UI/DefaultInput'


const PlaceInput = ({ placeName, onChangeText }) => {
   return (
      <DefaultInput 
         style={styles.input}
         value={placeName}
         placeholder="Place name"
         onChangeText={(val) => onChangeText(val)}
      />
   )
}

const styles = StyleSheet.create({
   input: {
      width: '100%'
   }
})

export default PlaceInput