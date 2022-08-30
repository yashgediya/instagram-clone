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

const LoginForm = ({navigation}) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
    .required()
    .min(6, 'Your password has to have at least 6 characters'),
  });
  
  const onLoginSuccess = async () => {
    await navigation.navigate('HomeScreen');
  };
  
  const onLogin = async (email, password) => {
    console.log(email, password);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      onLoginSuccess();
    } catch (error) {
      Alert.alert('Incorrect Email or Password');
    }
  };


  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => onLogin(values?.email, values?.password)}
        validationSchema={LoginFormSchema}
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
            <View style={{marginBottom: 30, alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Text style={{color: '#6BB0F5'}}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <Button title="Log In" onPress={handleSubmit} disabled={!isValid} />
            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
                <Text style={{color: '#6BB0F5'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

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
