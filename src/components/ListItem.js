import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


const ListItem = (props) => (
   <View style={styles.listItem} >
      <Image source={props.placeImage} style={styles.placeImage} />
      <Text>{props.placeName}</Text>
   </View>
)


const styles = StyleSheet.create({
   listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 10, 
      backgroundColor: '#eee',
      borderRadius: 5,
      marginBottom: 5 
   },
   placeImage: {
      height: 30,
      width: 30,
      margin: 8
   }
})

export default ListItem