import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#262524',
    },
    logoContainer: {
      marginTop: 40,
    },
    logo: {
      width: 175,
      height: 200,
      resizeMode: 'contain',
      marginTop: 100
    },
  
    overskrift1: {
      color: '#d7b179',
      fontSize: 50,
      marginTop: 10,
      },
  
    overskrift2: {
      color: '#d7b179',
      fontSize: 27,
      marginBottom: 50,
    },
  
    tekstContainer: {
      marginBottom: 20,
    },
    tekst: {
      fontSize: 16,
      alignSelf: 'flex-start',
      color: 'white',
    },
    bold: {
      fontWeight: 'bold',
    },
    marginBottom: {
      marginBottom: 10,
    },
    bildeContainer: {
      marginTop: 20,
    },
    bilde: {
      resizeMode: 'contain',
      top: '-5%',
      marginLeft: 130,
      transform: [{ rotate: '-12deg' }],
    },
  
    billetContainer: {
      position: 'absolute',
      top: '47%',
      left: 20,
      marginTop: 25,
      marginRight: 20,
      color: 'white',
    },
  
    billetinformasjon: {
      marginBottom: 5,
    },
  });