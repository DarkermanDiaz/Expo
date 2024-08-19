import { StyleSheet, ToastAndroid, StatusBar } from 'react-native';

export default function showToast() {
    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
      backgroundColor: '#6638f0',
      padding: 8,
    },
  });