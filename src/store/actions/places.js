import _ from 'lodash'

import { uiStartLoading, uiStopLoading } from './ui'


export const getPlaces = () => {
   return dispatch => {
      fetch('https://react-native-course-a02d2.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
         dispatch(setPlaces(_.map(parsedRes, (place, key) => ({
            ...place,
            image: { uri: place.imageUrl },
            id: key
         }))))
      })
      .catch(err => {
         console.log(err)
         alert('Something went wrong; please try again.')
      })
   }
}

export const setPlaces = places => ({
   type: 'SET_PLACES',
   places
}) 

export const addPlace = (placeName, location, image) => {
   return dispatch => {
      dispatch(uiStartLoading())

      fetch('https://us-central1-react-native-course-a02d2.cloudfunctions.net/storeImage', {
         method: 'POST',
         body: JSON.stringify({
            image: image.base64
         })
      })
      .then(res => res.json())
      .then(parsedRes => {
         return fetch('https://react-native-course-a02d2.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify({
               name: placeName,
               location,
               imageUrl: parsedRes.imageUrl
            })
         })
      })
      .then(res => res.json())
      .then(parsedRes => {
         console.log(parsedRes)
         dispatch(uiStopLoading())
      })
      .catch(err => {
         console.log(err)
         alert('Something went wrong; please try again.')
         dispatch(uiStopLoading())
      })
   }
}

export const deletePlace = (placeId) => {
   return dispatch => {
      fetch(`https://react-native-course-a02d2.firebaseio.com/places/${placeId}.json`, {
         method: 'DELETE'
      })
      .then(() => {
         dispatch({
            type: 'DELETE_PLACE',
            placeId
         })
      })
      .catch(err => {
         console.log(err)
         alert('Something went wrong; please try again.')
      })
   }
} 