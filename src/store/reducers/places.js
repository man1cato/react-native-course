const initialState= {
   places: [],
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SET_PLACES':
         return {
            ...state,
            places: action.places
         }
      case 'DELETE_PLACE': 
         return {
            ...state,
            places: state.places.filter(place => place.id !== action.placeId),
         }
      default: 
         return state
   }
} 