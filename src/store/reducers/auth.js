const initialState = {
   token: null,
   expiryDate: null
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'AUTH_SET_TOKEN':
         return {
            ...state,
            token: action.token,
            expiryDate: action.expiryDate
         }
      case 'AUTH_REMOVE_TOKEN': 
         return {
            ...state,
            token: null,
            expiryDate: null
         }
      default: 
         return state
   } 
}