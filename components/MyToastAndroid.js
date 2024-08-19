import { StyleSheet, ToastAndroid, StatusBar } from 'react-native';

export default function MyToastAndroid(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
