import React, { useState, useEffect } from 'react'
import { View, Dimensions, ImageBackground, StyleSheet } from 'react-native'

import startMainTabs from './startMainTabs'
import DefaultInput from '../components/UI/DefaultInput'
import H1Text from '../components/UI/H1Text'
import ButtonWithBackground from '../components/UI/ButtonWithBackground'

import backgroundImage from '../assets/bg.jpg'


const AuthScreen = () => {
   const [viewMode, setViewMode] = useState(Dimensions.get('window').height > 500 ? 'portrait' : 'landscape') 
   
   useEffect(() => {
      const handler = (dims) => setViewMode(dims.window.height > 500 ? 'portrait' : 'landscape')
      Dimensions.addEventListener('change', handler)
      return () => {
         Dimensions.removeEventListener('change', handler)
      }
   }, [])
   
   const handleLogin = () => {
      startMainTabs()
   }
   
   let headingText = null
   if (viewMode === 'portrait') {
      headingText = (<H1Text style={{color: "white"}}>Please Log In</H1Text>)
   }

   return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
         <View style={styles.container}>
            {headingText}
            <ButtonWithBackground color="#29aaf4" onPress={() => alert('clicked!')}>Switch to Login</ButtonWithBackground>
            <View style={styles.inputContainer}>
               <DefaultInput style={styles.input} placeholder="Email Address" />
               <View style={viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                  <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                     <DefaultInput style={styles.input} placeholder="Password" />
                  </View>
                  <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                     <DefaultInput style={styles.input} placeholder="Confirm Password" />
                  </View>
               </View>
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
   input: {
      backgroundColor: "#eee",
      borderColor: "#bbb"
   },
   inputContainer: {
      width: "80%"
   },
   portraitPasswordContainer: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start"
   },
   landscapePasswordContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between"
   },
   portraitPasswordWrapper: {
      width: "100%" 
   },
   landscapePasswordWrapper: {
      width: "48%"
   }
})

export default AuthScreen