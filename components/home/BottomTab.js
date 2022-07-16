import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {userData} from '../../data/userData';
import {Divider} from 'react-native-elements';

const BottomTab = () => {
  console.log(userData[0].Image);
  const bottomIcon = [
    {
      name: 'Home',
      image: require('../../assets/home-icon.png'),
      activeImage: require('../../assets/home-active-icon.png'),
    },
    {
      name: 'Search',
      image: require('../../assets/search-icon.png'),
      activeImage: require('../../assets/search-icon.png'),
    },
    {
      name: 'Reals',
      image: require('../../assets/reals-icon.png'),
      activeImage: require('../../assets/reals-active-icon.png'),
    },
    {
      name: 'Like',
      image: require('../../assets/header-like-icon.png'),
      activeImage: require('../../assets/like-icon-active.png'),
    },
    {
      name: 'Profile',
      image: {uri: userData[0].Image},
      activeImage: {uri: userData[0].Image},
    },
  ];
  const [activeTab, setActiveTab] = useState('Home');
  return (
    <View>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {bottomIcon &&
          bottomIcon.map((icon, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(icon.name)}>
                <Image
                  source={
                    activeTab === icon.name ? icon.activeImage : icon.image
                  }
                  style={[
                    styles.icon,
                    icon.name === 'Profile' ? styles.profileIcon : null,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  profileIcon: {
    borderRadius: 50,
  },
});
export default BottomTab;
