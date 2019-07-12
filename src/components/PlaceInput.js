import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'


const PlaceInput = (props) => {
  const [placeName, setPlaceName] = useState('')

   return (
      <View style={styles.inputContainer}>
         <TextInput
            style={styles.placeInput}
            value={placeName}
            placeholder="An awesome place"
            onChangeText={(val) => setPlaceName(val)}
         />
         <Button
            style={styles.placeButton}
            title="Add"
            onPress={() => {
               props.handleSubmit(placeName)
               setPlaceName('')
            }}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   placeInput: {
      width: '70%'
   },
   placeButton: {
      width: '30%',
      minWidth: 300
   }
})

export default PlaceInput