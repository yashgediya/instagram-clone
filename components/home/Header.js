import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const HeaderComponent = ({navigation}) => {
  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Image
          source={require('../../assets/header-logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('NewPostScrren')}>
          <Image
            source={require('../../assets/header-add-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/header-like-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadbadgeText}>11</Text>
          </View>
          <Image
            source={require('../../assets/header-message-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingTop: 5,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  unreadbadgeText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default HeaderComponent;
