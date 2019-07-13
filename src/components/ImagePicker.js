import React from 'react'
import { View, Button, Image, StyleSheet } from 'react-native'


const ImagePicker = (props) => {
   return (
      <View style={styles.container}>
         <View style={styles.placeholder}>
            <Image style={styles.previewImage} source={props.source} />
         </View>

         <View style={styles.button}>
            <Button title="Pick Image" onPress={() => alert('image picked!')}/>
         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      width: '80%',
      alignItems: 'center'
   },
   previewImage: {
      width: "100%",
      height: "100%"
   },
   button: {
      margin: 8
   },
   placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "100%",
      height: 150
   }
})

export default ImagePicker 