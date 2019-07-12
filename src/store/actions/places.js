export const addPlace = (placeName) => ({
   type: 'ADD_PLACE',
   placeName
})

export const deletePlace = (placeKey) => ({
   type: 'DELETE_PLACE',
   placeKey
})

// export const selectPlace = (key) => ({
//    type: 'SELECT_PLACE',
//    key
// })

// export const deselectPlace = () => ({
//    type: 'DESELECT_PLACE'
// })