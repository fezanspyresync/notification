import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {requestUserPermission} from './src/utility/notificationServices';

export const showError = message => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message: message,
  });
};

export default function App() {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <SafeAreaView>
      <Text>App</Text>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}
