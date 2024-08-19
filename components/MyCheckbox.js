import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyCheckbox(){
    const[checked, setChecked] = useState(false);
    return(
        <Pressable style = {[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => setChecked(!checked)}>
            {checked && <Ionicons name = "checkmark" size = {24} color="white" />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'coral',
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      backgroundColor: 'coral',
    },
  });