import _ from 'lodash'

import { uiStartLoading, uiStopLoading, } from './ui'
import { authGetToken } from './auth'

export const getPlaces = () => {
   return async dispatch => {
      try {
         const token = await dispatch(authGetToken())
         const res = await fetch(`https://react-native-course-a02d2.firebaseio.com/places.json?auth=${token}`)
         const body = await res.json()
         if (body.error) {
            throw new Error(body.error.message)
         } else {
            dispatch(setPlaces(_.map(body, (place, key) => ({
               ...place,
               image: { uri: place.imageUrl },
               id: key
            }))))
         }
      } catch (err) {
         console.log(err)
         alert('Something went wrong; please try again.')
      }
   }
}

export const setPlaces = places => ({
   type: 'SET_PLACES',
   places
}) 

export const addPlace = (placeName, location, image) => {
   return async dispatch => {
      try {
         dispatch(uiStartLoading())

         const token = await dispatch(authGetToken())         
         const imageRes = await fetch('https://us-central1-react-native-course-a02d2.cloudfunctions.net/storeImage', {
            method: 'POST',
            headers: {
               'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
               image: image.base64
            })
         })
         const imageBody = await imageRes.json()
   
         const placesRes = await fetch(`https://react-native-course-a02d2.firebaseio.com/places.json?auth=${token}`, {
            method: 'POST',
            body: JSON.stringify({
               name: placeName,
               location,
               imageUrl: imageBody.imageUrl
            })
         })
         const placesBody = await placesRes.json()
         if (placesBody.error) { console.log(placesBody.error.message) }

         dispatch(uiStopLoading())
      } catch (err) {
         console.log(err)
         alert('Something went wrong; please try again.')
         dispatch(uiStopLoading())
      }
   }
}

export const deletePlace = (placeId) => {
   return async (dispatch, getState) => {
      try {
         const token = await dispatch(authGetToken())
         const res = await fetch(`https://react-native-course-a02d2.firebaseio.com/places/${placeId}.json?auth=${token}`, {
            method: 'DELETE'
         })
         console.log(res)
         dispatch({
            type: 'DELETE_PLACE',
            placeId
         })
      } catch (err) {
         console.log(err)
         alert('Something went wrong; please try again.')
      }
   }
} 