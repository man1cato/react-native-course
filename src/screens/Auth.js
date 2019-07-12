import React from 'react'
import { View, Text, Button } from 'react-native'

import startMainTabs from './startMainTabs'

const AuthScreen = () => {
   const handleLogin = () => {
      startMainTabs()
   }

   return (
      <View>
         <Text>Auth Screen</Text>
         <Button title="Login" onPress={() => handleLogin()}></Button>
      </View>
   )
}

export default AuthScreen