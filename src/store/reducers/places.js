const initialState= {
   places: [],
   // selectedPlace: null
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_PLACE':
         return {
            ...state,
            places: state.places.concat({
               key: Math.random().toString(),
               name: action.placeName,
               image: { uri: 'https://www.resortdorset.com/fcimages/images/dorsetnews/Durdle-Door.jpg' }
            })
         }
      case 'DELETE_PLACE': 
         return {
            ...state,
            places: state.places.filter(place => place.key !== action.placeKey),
            // selectedPlace: null
         }
      // case 'SELECT_PLACE': 
      //    return {
      //       ...state,
      //       selectedPlace: state.places.find(place => place.key === action.key)
      //    }
      // case 'DESELECT_PLACE':
      //    return {
      //       ...state,
      //       selectedPlace: null
      //    }
      default: 
         return state
   }
} 