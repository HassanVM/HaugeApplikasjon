// HjemSide.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import MenuBar from '../Komponenter/MenuBar';
import styles from '../Styles/HjemSideStyling';

const Hjemside = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      {/* Hauge logoen blir vist */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../Bilder/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Informasjon om Hauge Museum */}
      <Text style={styles.overskrift1}> Velkommen til </Text>
  <Text style={[styles.overskrift2]}> Hauges Minde Museum </Text>
      <View style={styles.tekstContainer}>
        <Text style={[styles.tekst, styles.marginBottom]}>
          <Text style={styles.bold}>Åpningstider:</Text> Lørdag-Søndag (12-4 PM)
        </Text>
        <Text style={[styles.tekst, styles.marginBottom]}>
          <Text style={styles.bold}>Adresse:</Text> Hans Nilsen Hauges vei 39, 1661 Rolvsøy
        </Text>
        <Text style={styles.tekst}>
          <Text style={styles.bold}>Telefon:</Text> 69 33 54 72
        </Text>
      </View>

      {/* Informasjon om billettpriser*/}
<Text style={styles.hovedbilletinformasjon}> </Text> 
<View style={styles.billetContainer}>
<Text style={[styles.billetinformasjon, { color: 'white' }]}> Voksen: 80 kr </Text> 
<Text style={[styles.billetinformasjon, { color: 'white' }]}> Barn: 35 kr </Text> 
<Text style={[styles.billetinformasjon, { color: 'white' }]}> Familie: 200 kr </Text> 
</View>

      {/* Bilde av Hans statuen */}
      <View style={styles.bildeContainer}>
        <Image
          source={require('../Bilder/hans.png')}
          style={styles.bilde}
        />
      </View>

      {/* Menubar komponentet */}
      <MenuBar navigation={navigation} />
    </View>
  );
};

export default Hjemside;
