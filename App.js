import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Selections from './compoents/Selections';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function App() {
  
  return (
    <View style={styles.container}>
        <Selections />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
  },
});
