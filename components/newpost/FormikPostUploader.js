import {View, Text, Image, Button} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {TextInput} from 'react-native';
import {Divider} from 'react-native-elements';

const PLACEHOLDER_IMG =
  'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  Caption: Yup.string().max(2200, ' Caption has reached the characters'),
});

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState();

  console.log(thumbnailUrl);
  return (
    <Formik
      initialValues={{caption: '', imgUrl: ''}}
      onSubmit={value => console.log(value)}
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
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
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
