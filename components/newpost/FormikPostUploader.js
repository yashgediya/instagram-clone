import {View, Text, Image, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {TextInput} from 'react-native';
import {Divider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PLACEHOLDER_IMG =
  'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png';

const uploadPostSchema = Yup.object().shape({
  imgUrl: Yup.string().url().required('A URL is required'),
  Caption: Yup.string().max(2200, ' Caption has reached the characters'),
});

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({
    username: '',
    profilePicture: '',
  });

  const getUserName = () => {
    const user = auth().currentUser;
    const unsubscribe = firestore()
      .collection('Users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data()?.username,
            profilePicture: doc.data()?.profile_picture,
          });
        }),
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribes = firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: auth().currentUser.uid,
        caption: caption,
        createdAt: firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_user: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unsubscribes;
  };

  return (
    <Formik
      initialValues={{caption: '', imgUrl: ''}}
      onSubmit={value => uploadPostToFirebase(value?.imgUrl, value?.caption)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG}}
              style={{width: 100, height: 100}}
            />
            <View style={{flex: 1, marginLeft: 12}}>
              <TextInput
                style={{color: 'white', fontSize: 20}}
                placeholder="Write a caption..."
                placeholderTextColor={'gray'}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>

          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            style={{color: 'white', fontSize: 20}}
            placeholder="Enter Image Url"
            placeholderTextColor={'gray'}
            onChangeText={handleChange('imgUrl')}
            onBlur={handleBlur('imgUrl')}
            value={values.imgUrl}
          />
          {errors.imgUrl && (
            <Text style={{fontSize: 10, color: 'red'}}>{errors.imgUrl}</Text>
          )}
          <View style={{margin: 20, marginHorizontal: 30}}>
            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
