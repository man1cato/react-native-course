import React from 'react'
import { View, Button, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker'


class PickImage extends React.Component {
   state = {
      pickedImage: null
   }

   reset = () => {
      this.setState({ pickedImage: null })
   }

   handlePickImage = () => {
      ImagePicker.showImagePicker({ 
         title: 'Pick an Image', 
         maxWidth: 800, 
         maxHeight: 600 
      }, res => {
         if (res.didCancel) {
            console.log('User cancelled')
         } else if (res.error) { 
            console.log('Error', res.error)
         } else {
            this.setState({ pickedImage: { uri: res.uri } })
            this.props.onImagePicked({ 
               uri: res.uri,
               base64: res.data
            })
         }
      })
   }
   
   render () {
      return (
         <View style={styles.container}>
            <View style={styles.placeholder}>
               <Image style={styles.previewImage} source={this.state.pickedImage} />
            </View>
   
            <View style={styles.button}>
               <Button title="Pick Image" onPress={this.handlePickImage}/>
            </View>
         </View>
      )
   }
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