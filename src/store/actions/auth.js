import AsyncStorage from '@react-native-community/async-storage';

import { uiStartLoading, uiStopLoading } from './ui'
import startMainTabs from '../../screens/startMainTabs'
import App from '../../../App'

const apiKey = 'AIzaSyB_iVAmuxsGnYchzBSbiJMIU6lvYj8wY5g'

export const tryAuth = (authData, authMode) => {
   const path = authMode === 'login' ? 'signInWithPassword' : 'signUp'
   return async (dispatch) => {
      dispatch(uiStartLoading())
      try {
         const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${path}?key=${apiKey}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email: authData.email,
               password: authData.password,
               returnSecureToken: true
            })
         })
         const body = await res.json()
         console.log('AUTH BODY:', body)
         if (!body.idToken) {
            throw new Error('Status code ' + body.error.code + ': ' + body.error.message)
         } else {
            dispatch(authStoreToken(body.idToken, body.expiresIn, body.refreshToken))
            startMainTabs()
         }
         dispatch(uiStopLoading)
      } catch (err) {
         alert("Authentication failed, please try again.")
         console.log(err)
         dispatch(uiStopLoading())
      }
   }
}

export const authSetToken = (token, expiryDate) => ({
   type: 'AUTH_SET_TOKEN',
   token, 
   expiryDate
})

export const authStoreToken = (token, expiresIn, refreshToken) => {
   return dispatch => {
      const now = new Date()
      const expiryDate = new Date(now.getTime() + expiresIn * 1000)
      dispatch(authSetToken(token, expiryDate))
      AsyncStorage.setItem('auth_token', token)
      AsyncStorage.setItem('auth_expiryDate', expiryDate)
      AsyncStorage.setItem('auth_refreshToken', refreshToken)
   }
}

export const authGetToken = () => {
   return async (dispatch, getState) => {
      let token = getState().auth.token
      let expiryDate = getState().auth.expiryDate
      if (!token || expiryDate <= new Date()) {
         try {
            token = await AsyncStorage.getItem('auth_token')
            if (!token) {
               throw new Error('Token not found.')
            } 
            expiryDate = await AsyncStorage.getItem('auth_expiryDate') 
            expiryDate = Date.parse(expiryDate)
            const now = new Date()
            if (!expiryDate || now > expiryDate) {
               throw new Error('Token expired.')
            }
            dispatch(authSetToken(token, expiryDate))
            return token
         } catch (err) {
            const refreshToken = await AsyncStorage.getItem('auth_refreshToken')
            if (refreshToken) {
               const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: `grant_type=refresh_token&refresh_token=${refreshToken}`
               })
               const body = await res.json()
               dispatch(authStoreToken(body.id_token, body.expires_in, body.refresh_token))
               return body.id_token
            }

            dispatch(authClearStorage())
            console.log(err)
         }
      } else {
         return token
      }
   }
}

export const authAutoSignIn = () => {
   return async dispatch => {
      try {
         const token = await dispatch(authGetToken())
         if (!token) { 
           return
         }
         startMainTabs()
      } catch (err) {
         console.log(err)
      }
   }
}

export const authClearStorage = () => {
   return async dispatch => {
      try {
         AsyncStorage.multiRemove(['auth_token', 'auth_expiryDate', 'auth_refreshToken'])
      } catch (err) {
         console.log('Failed to clear storage.', err)
      }
   }
}

export const authRemoveToken = () => {
   return {
      type: 'AUTH_REMOVE_TOKEN'
   }
}

export const authLogout = () => {
   return async dispatch => {
      try {
         await dispatch(authClearStorage())
         App()
         dispatch(authRemoveToken())
      } catch (err) {
         console.log('Logout failed.', err)
      }
   }
}
