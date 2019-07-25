export const addPlace = (placeName, location, image) => ({
   type: 'ADD_PLACE',
   placeName,
   location,
   image
})

export const deletePlace = (placeKey) => ({
   type: 'DELETE_PLACE',
   placeKey
})