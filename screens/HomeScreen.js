import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../components/home/Header';
import Stories from '../components/home/Stories';
import {postData} from '../data/postData';
import Post from '../components/home/Post';
import BottomTab from '../components/home/BottomTab';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    firestore()
      .collectionGroup('posts')
      .orderBy("createdAt" , "desc")
      .onSnapshot(snapshot => {
        if (!(snapshot === null)) {
          setPosts(
            snapshot?.docs?.map(post => ({id: post?.id, ...post?.data()})),
          );
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts &&
          posts?.map((post, index) => (
            <Post post={JSON.stringify(post)} key={index} />
          ))}
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
