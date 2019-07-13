import React from 'react'
import { View, Button, ImageBackground, StyleSheet } from 'react-native'

import startMainTabs from './startMainTabs'
import DefaultInput from '../components/UI/DefaultInput'
import H1Text from '../components/UI/H1Text'
import ButtonWithBackground from '../components/UI/ButtonWithBackground'

import backgroundImage from '../assets/bg.jpg'

const AuthScreen = () => {
   const handleLogin = () => {
      startMainTabs()
   }

   return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
         <View style={styles.container}>
            <H1Text style={{color: "white"}}>Please Log In</H1Text>
            <ButtonWithBackground color="#29aaf4" onPress={() => alert('clicked!')}>Switch to Login</ButtonWithBackground>
            <View style={styles.inputContainer}>
               <DefaultInput style={styles.input} placeholder="Email Address" />
               <DefaultInput style={styles.input} placeholder="Password" />
               <DefaultInput style={styles.input} placeholder="Confirm Password" />
            </View>
            <ButtonWithBackground color="#29aaf4" onPress={() => handleLogin()}>Submit</ButtonWithBackground>
         </View>
      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   backgroundImage: {
      width: "100%",
      flex: 1
   }, 
   inputContainer: {
      width: "80%"
   },
   input: {
      backgroundColor: "#eee",
      borderColor: "#bbb"
   }
})

export default AuthScreen