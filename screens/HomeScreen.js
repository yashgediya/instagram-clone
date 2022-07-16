import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import HeaderComponent from '../components/home/Header';
import Stories from '../components/home/Stories';
import {postData} from '../data/postData';
import Post from '../components/home/Post';
import BottomTab from '../components/home/BottomTab';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} />
      <Stories />
      <ScrollView>
        {postData &&
          postData.map((item, index) => <Post post={item} key={index} />)}
      </ScrollView>
      <BottomTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen;
