import {View, Text} from 'react-native';
import React from 'react';
import SignINStack from './navigation';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <LoginScreen />
    </View>
  );
};

export default App;
