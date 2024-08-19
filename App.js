import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View, Platform, Text, ToastAndroid} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useState, useRef } from 'react';
import domtoimage from 'dom-to-image';

import { Button, ImageViewer, CircleButton, IconButton, EmojiPicker, EmojiList, EmojiSticker, MyCheckbox, MyToastAndroid } from './components';

const image = { uri: "https://docs.expo.dev/static/images/tutorial/background-image.png" };

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [pickedEmoji,setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(false);

  if (status === null) {
    requestPermission();
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const pickImageAsync = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web')
    {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

    await MediaLibrary.saveToLibraryAsync(localUri);
    if (localUri){
      alert("Saved");
    }
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const dataUrl = await domtoimage.toJpeg(imageRef.current,{
        quality: 0.95,
        width: 320,
        height: 400,
      });

      let link = document.createElement('a');
      link.download = 'sticker-smash.jpeg';
      link.href = dataUrl;
      link.click();
    }catch (e) {
      console.log(e);
    }
    }
  }
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage = {selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      </View>
        ) : (
      <View style={styles.footerContainer}>
        <Button theme = "primary" label="Choose a photo" onPress = {pickImageAsync} />
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
      </View>
        )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />

      <View style={styles.appContainer}>
        <Text style={styles.appTitle}>Checkbox Example</Text>
        <View style={styles.checkboxContainer}>
          <MyCheckbox onChange={() => setChecked(!checked)} checked={checked} />
          <Text style={styles.checkboxLabel}>{`⬅️ Click!`}</Text>
        </View>
      </View>

    </GestureHandlerRootView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  image:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer:{
    position:"absolute",
    bottom:80,
  },
  optionsRow:{
    alignItems:"center",
    flexDirection:"row",
  },
  text: {
    color:'white',
    fontSize:42,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor: '#000000a0',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 18,
  },
});
