import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {SignINStack, SignOutStack} from './navigation';
import { useState } from 'react';

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const useHandler = user =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(() => {
    auth().onAuthStateChanged(user => useHandler(user));
  }, []);

  return <>{currentUser ? <SignINStack /> : <SignOutStack />}</>;
};

export default AuthNavigation;
