const initialState= {
   places: [],
   placeAdded: false
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SET_PLACES':
         return {
            ...state,
            places: action.places
         }
      case 'START_ADD_PLACE': 
         return {
            ...state, 
            placeAdded: false
         }
      case 'PLACE_ADDED':
         return {
            ...state,
            placeAdded: true
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