import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import FormikPostUploader from '../components/newpost/FormikPostUploader';
import AddNewPost from '../components/newpost/AddNewPost';

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <AddNewPost navigation={navigation} />
      <FormikPostUploader navigation={navigation}/>
    </SafeAreaView>
  );
};

export default NewPostScreen;
