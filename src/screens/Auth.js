import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, ImageBackground, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as yup from 'yup'
import update from 'immutability-helper'
import _ from 'lodash'

import DefaultInput from '../components/UI/DefaultInput'
import H1Text from '../components/UI/H1Text'
import ButtonWithBackground from '../components/UI/ButtonWithBackground'
import { tryAuth, authAutoSignIn } from '../store/actions/auth'
import backgroundImage from '../assets/bg.jpg'


let schema = yup.object().shape({
   email: yup.string().required('Required').email('Enter a valid email'),
   password: yup.string()
      .required('Required')
      .min(7, 'Password must be at least 7 characters')
      .max(20, 'Password must be no more than 20 characters')
      // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&-]).{8,10}$/, 'Password must contain lowercase, uppercase, numbers, and special characters')
})

const AuthScreen = props => {
   useEffect(() => {
      props.authAutoSignIn()
      
      const handler = (dims) => setViewMode(dims.window.height > 500 ? 'portrait' : 'landscape')
      Dimensions.addEventListener('change', handler)
      return () => {
         Dimensions.removeEventListener('change', handler)
      }
   }, [])

   const [viewMode, setViewMode] = useState(Dimensions.get('window').height > 500 ? 'portrait' : 'landscape')
   const [authMode, setAuthMode] = useState('login')
   const [controls, setControls] = useState({
      email: { value: '', valid: false, errorMessage: null },
      password: { value: '', valid: false, errorMessage: null },
      passwordConfirmation: { value: '', valid: false, errorMessage: null }
   })

   const handleTextInput = (key, value) => {
      setControls(update(controls, {
         [key]: {
            value: { $set: value.trim() }
         }
      }))
   }

   const handleValidation = (key) => {
      if (key === 'passwordConfirmation') {
         if (controls.passwordConfirmation.value === controls.password.value && controls.password.valid) {
            setControls(update(controls, {
               passwordConfirmation: {
                  valid: { $set: true },
                  errorMessage: { $set: null }
               }
            }))
         } else {
            setControls(update(controls, {
               passwordConfirmation: {
                  valid: { $set: false },
                  errorMessage: { $set: 'Passwords must match' }
               }
            }))
         }         
      } else {
         yup.reach(schema, key).validate(controls[key].value).then(() => {
            setControls(update(controls, {
               [key]: {
                  valid: { $set: true },
                  errorMessage: { $set: null }
               }
            }))
         }).catch(err => {
            setControls(update(controls, {
               [key]: {
                  valid: { $set: false },
                  errorMessage: { $set: err.errors[0] }
               }
            }))
         })
      }
   }

   // useEffect(() => {
   //    handleValidation('password')
   // }, [controls.password.value])

   useEffect(() => {
      handleValidation('passwordConfirmation')
   }, [controls.passwordConfirmation.value])

   const handleLogin = () => {
      const authData = {
         email: controls.email.value,
         password: controls.password.value
      }
      props.tryAuth(authData, authMode)
   }

   return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
         <KeyboardAvoidingView style={styles.container} >
            {viewMode === 'portrait' && (
               <H1Text style={{ color: "white" }}>Please Log In</H1Text>
            )}

            <ButtonWithBackground
               color="#29aaf4"
               onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            >
               Switch to {authMode === 'login' ? 'Sign Up' : 'Log In'}
            </ButtonWithBackground>

            <View style={styles.inputContainer}>
               <DefaultInput
                  style={styles.input}
                  placeholder="Email Address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={val => handleTextInput('email', val)}
                  onBlur={() => handleValidation('email')}
               />
               {!!controls.email.errorMessage && (
                  <Text style={{ color: 'white' }}>{controls.email.errorMessage}</Text>
               )}

               <View style={viewMode === 'landscape' && authMode === 'signup' ? styles.landscapePasswordContainer : styles.portraitPasswordContainer}>
                  <View style={viewMode === 'landscape' && authMode === 'signup' ? styles.landscapePasswordWrapper : styles.portraitPasswordWrapper}>
                     <DefaultInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={val => handleTextInput('password', val)}
                        onEndEditing={() => handleValidation('password')}
                     />
                     {!!controls.password.errorMessage && (
                        <Text style={{ color: 'white' }}>{controls.password.errorMessage}</Text>
                     )}
                  </View>

                  {authMode === 'signup' && (
                     <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                        <DefaultInput
                           style={styles.input}
                           placeholder="Confirm Password"
                           secureTextEntry
                           onChangeText={val => handleTextInput('passwordConfirmation', val)}
                        />
                        {!!controls.passwordConfirmation.errorMessage && (
                           <Text style={{ color: 'white' }}>{controls.passwordConfirmation.errorMessage}</Text>
                        )}
                     </View>
                  )}
               </View>
            </View>

            {props.isLoading ? (
               <ActivityIndicator />
            ) : (
               <ButtonWithBackground
                  color="#29aaf4"
                  disabled={!controls.email.valid || !controls.password.valid || authMode==='signup' && !controls.passwordConfirmation.valid}
                  onPress={() => handleLogin()}
               >
                  Submit
               </ButtonWithBackground>
            )}
         </KeyboardAvoidingView>
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

const mapStateToProps = state => ({
   isLoading: state.ui.isLoading
})

const mapDispatchToProps = dispatch => ({
   tryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
   authAutoSignIn: () => dispatch(authAutoSignIn())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)