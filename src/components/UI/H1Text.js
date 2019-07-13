import React from 'react'
import { Text, StyleSheet } from 'react-native'
import DefaultText from './DefaultText'

const H1Text = props => (
   <DefaultText>
      <Text 
         {...props}
         style={[styles.h1, props.style]}
      >
         {props.children}
      </Text>
   </DefaultText>
)

const styles = StyleSheet.create({
   h1: {
      fontSize: 28,
      fontWeight: "bold"
   }
})

export default H1Text