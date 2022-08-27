import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import LoginForm from '../components/loginScreen/LoginForm';

const LoginScreen = ({navigation}) => {
  const instagramLogo =
    'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-128.png';
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={{uri: instagramLogo, height: 100, width: 100}} />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logocontainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});
