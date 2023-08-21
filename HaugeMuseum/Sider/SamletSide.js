import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';  // ( https://www.npmjs.com/package/react-native-qrcode-svg )
import MenuBar from '../Komponenter/MenuBar';
import styles from '../Styles/SamletSideStyling';


const SamletSide = ({ navigation }) => {
  return (    
  // Her blir QR kodene vist for hvert unikt rom med informasjon. 
  // "Title" skal matche med samme title på SkannSide for at det skal være riktig tilkoblet.
    <View style={styles.container}>
      <Text style={styles.overskrift}>Samlet QR - koder</Text>
      <View style={styles.qrContainer}>
        <Text style={styles.qrOverskrift}>Rom 1 - Høgsetetavler</Text>    
        <QRCode
         value='{
            "title":"Rom 1",
            "description":"",        
            "image":"https://haugesminde.no",
            "audio":"https://haugesminde.no"}'
          size={200}
          color='black'
          backgroundColor='white'
        />
      </View>
      <View style={styles.qrContainer}>
        <Text style={styles.qrOverskrift}>Rom 2 - Rokk</Text>
        <QRCode
          value='{
            "title":"Rom 2",
            "description":"",
            "image":"https://haugesminde.no",
            "audio":"https://haugesminde.no"}'
          size={200}
          color='black'
          backgroundColor='white'
        />
      </View>
      <MenuBar navigation={navigation} />
    </View>
  );
};


export default SamletSide;
