import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showError} from '../../App';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmTokwn();
  }
}

const getFcmTokwn = async () => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('old token generate', fcmToken);
    if (!fcmToken) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('newly generated token', fcmToken);
        AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch (error) {
    showError(error.message);
  }
};
