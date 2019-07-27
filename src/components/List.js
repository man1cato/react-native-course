import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import ListItem from './ListItem'


const List = ({ items, handleSelect }) => (
   <FlatList 
      style={styles.listContainer}
      data={items}
      renderItem={(info) => (
         <TouchableOpacity
            onPress={() => handleSelect(info.item.id)}
         >
            <ListItem placeName={info.item.name} placeImage={info.item.image} />
         </TouchableOpacity>
      )}
   />
)

const styles = StyleSheet.create({
   listContainer: {
      width: '100%'
   }
})

export default List