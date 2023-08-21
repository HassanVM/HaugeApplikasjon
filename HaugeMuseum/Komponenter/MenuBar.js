import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const MenuBar = ({ navigation }) => {
 
  
  return (
    <View style={styles.menuBar}>
      {/* Navigasjonslink for 'Hjem' */}
      <TouchableOpacity onPress={() => navigation.navigate('Hjem')}>
        <View style={styles.menuElement}>
          <Image
            source={require('../Bilder/hjemikon.png')}
            style={styles.menuBilde}
          />
          <Text>Hjem</Text>
        </View>
      </TouchableOpacity>

      {/* Navigasjonslink for 'Skann' */}
      <TouchableOpacity onPress={() => navigation.navigate('Skann')}>
        <View style={styles.menuElement}>
          <Image
            source={require('../Bilder/scanikon.png')}
            style={styles.menuBilde}
          />
          <Text>Skann</Text>
        </View>
      </TouchableOpacity>

      {/* Navigasjonslink for 'Quiz' */}
      <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
        <View style={styles.menuElement}>
          <Image
            source={require('../Bilder/quizikon.png')}
            style={styles.menuBilde}
          />
          <Text>Quiz</Text>
        </View>
      </TouchableOpacity>

      {/* Navigasjonslink for 'Samlet' */}
      <TouchableOpacity onPress={() => navigation.navigate('Samlet')}>
        <View style={styles.menuElement}>
          <Image
            source={require('../Bilder/altsamletikon.png')}
            style={styles.menuBilde}
          />
          <Text>Samlet</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#d7b179',
    height: 100,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  menuElement: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBilde: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
};

export default MenuBar;
