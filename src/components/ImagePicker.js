import React, { useState } from 'react'
import { View, Button, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker'


const PickImage = props => {
   const [pickedImage, setPickedImage] = useState(null)

   const handlePickImage = () => {
      ImagePicker.showImagePicker({ title: 'Pick an Image'}, res => {
         if (res.didCancel) {
            console.log('User cancelled')
         } else if (res.error) { 
            console.log('Error', res.error)
         } else {
            setPickedImage({ uri: res.uri })
            props.onImagePicked({ 
               uri: res.uri,
               base64: res.data
            })
         }
      })
   }
   
   return (
      <View style={styles.container}>
         <View style={styles.placeholder}>
            <Image style={styles.previewImage} source={pickedImage} />
         </View>

         <View style={styles.button}>
            <Button title="Pick Image" onPress={() => handlePickImage()}/>
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

export default PickImage 