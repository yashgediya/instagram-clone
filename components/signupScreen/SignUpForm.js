import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';
import auth from '@react-native-firebase/auth';


const SignUpForm = ({navigation}) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least 6 characters'),
  });

  const onRegisterNewUserSuccess = async () => {
    await navigation.navigate('HomeScreen');
  };
  


  const registerNewUser = async (email, password , username) => {
    console.log(email, password);
    try {
      await auth().createUserWithEmailAndPassword(email, password , username);
      onRegisterNewUserSuccess()
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert("Please Enter Currect Email or Password or username");
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={values => registerNewUser(values?.email , values?.password , values?.username)}
        validationSchema={SignupFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values?.email?.length < 1 ||
                    Validator?.validate(values?.email)
                      ? '#CCC'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number , username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values?.username?.length ||
                    values?.username?.length >= 2
                      ? '#CCC'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username"
                secureTextEntry={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values?.password?.length ||
                    values?.password?.length >= 6
                      ? '#CCC'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <View style={{marginTop: 50}}>
              <Button
                title="Sign up"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
            <View style={styles.signUpContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                <Text style={{color: '#6BB0F5'}}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  signUpContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});
