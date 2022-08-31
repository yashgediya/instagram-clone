import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import HeaderComponent from '../components/home/Header';
import Stories from '../components/home/Stories';
import {postData} from '../data/postData';
import Post from '../components/home/Post';
import BottomTab from '../components/home/BottomTab';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    firestore()
      .collectionGroup('posts')
      .onSnapshot(snapshot => {
        console.log(snapshot.docs.map(doc => doc.data()));
      });
  }, []);
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
