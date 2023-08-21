import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#262524',
      },
      quizOverskrift: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
      },
      spørsmålTeller: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
      },
      spørsmålContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
      },
      sporsmol: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      alternativContainer: {
        width: '80%',
      },
      alternativRad: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      alternativ: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        
      },
      alternativTekst: {
        fontSize: 16,
        color: 'white',
      },
      valgtAlternativ: {
        backgroundColor: 'green',
      },
      feilAlternativ: {
        backgroundColor: 'red',
      },
      nesteKnapp: {
        backgroundColor: '#0099ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 20,
      },
      nesteKnappTekst: {
        color: 'white',
        fontSize: 16,
      },
      quizResultatContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      quizResultatOverskriftTekst: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
      },
      quizResultatTekst: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    
      },
      omstartKnapp: {
        backgroundColor: '#0099ff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      omstartKnappTekst: {
        color: 'white',
        fontSize: 16,
      },
    });