import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import MenuBar from '../Komponenter/MenuBar';

// Array med museumsrom og informasjon om dem
const museumRom = [
  {
    id: 1,
    name: 'Høgsetetavler',
    location: 'First floor',
    qrKodeData: JSON.stringify({
      title: 'Rom 1',
      description:
        'Høgsetetavler som var plassert ved husbøndens plass ved bordet, var typisk for gårdene i Østfold. Disse tavlene kommer fra Evenrød gård. Motivene er fra Marlas budskaps dag. Høgsetetavler som var plassert ved husbøndens plass ved bordet, var typisk for gårdene i Østfold. Disse tavlene kommer fra Evenrød gård. Motivene er fra Marlas budskaps dag.Høgsetetavler som var plassert ved husbøndens plass ved bordet, var typisk for gårdene i Østfold. Disse tavlene kommer fra Evenrød gård. Motivene er fra Marlas budskaps dag.',
      image: 'https://i.ibb.co/4mQpn8G/haugerom.jpg',  // (VoiceBooking, U,Å)
      audio: require('../Bilder/opptak1.m4a'),
      duration: 40000, // Millisekunder
    }),
  },
  {
    id: 2,
    name: 'Rokk',
    location: 'Rokk',
    qrKodeData: JSON.stringify({
      title: 'Rom 2',
      description:
        'Rokk er en gammel teknikk for å spinne lintråd som er blitt brukt i tusenvis av år. Prosessen innebærer å trekke ut linfiber fra linplanter og vri dem samme til en tråd ved hjelp av en rokk. rokken består av en håndtegn som roterer rundt en akse, mens tråden blir spunnet. Rokken var en viktig oppfinnelse for produksjon av tekstiler, spesielt i Europa i middelalderen da tekstilproduksjon var en av de viktigste økonomiske aktivitene. den tillot mennesker å spinne tråder på en effektiv måte og produsere tekstiler av høy kvalitet. ',
      image: 'https://i.ibb.co/g3R39bc/haugerom2.jpg',
      audio: require('../Bilder/nyopptak2.mp3'),
      duration: 60000, 
    }),
  },
];

const SkannSide = ({ navigation }) => {
  // Tilstandsvariabler som vi skal benytte i filen
  const [harTilgang, setHarTilgang] = useState(null);
  const [skannet, setSkannet] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [valgteRom, setValgteRom] = useState(null);
  const [somStarter, setSomSpiller] = useState(false);
  const [avspillingProsess, setAvspillingProsess] = useState(0);
  const audioPlayerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Ber om kameratillatelse fra brukeren første gang når brukeren benytter seg av appen
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHarTilgang(status === 'granted');
    })();
  }, []);

  const handleBarKodeSkannet = ({ type, data }) => {
    // Håndter strekkodeskanningshendelse 
    setSomSpiller(false);
    setSkannet(true);
    setCameraOn(false);

    const parsedData = JSON.parse(data); 
    const romData = museumRom.find((room) => { // Finn romdataene som samsvarer med den skannede QR-koden 
      const roomParsedData = JSON.parse(room.qrKodeData); // Parse QR-kodedataene for hvert rom 
      return roomParsedData.title === parsedData.title; // Sjekker om romtittelen samsvarer med tittelen på skannede data 
    });
    
    if (romData) { // 
      const qrKodeData = JSON.parse(romData.qrKodeData); //Hvis et samsvarende rom blir funnet, analyser QR-kodedataene til rommet 
      setValgteRom({ ...romData, ...qrKodeData }); // Still inn det valgte rommet med de kombinerte romdataene og QR-kodedataene 
    } else { // 
      setValgteRom(null); // Fjern det valgte rommet 
      Linking.openURL(data); // Åpne den skannede URL-adressen (forutsatt at det ikke er en QR-kode for rommet) 
    }
  };

  const toggleCamera = () => {
    setCameraOn(!cameraOn);      // Skru kamera på 
    setSkannet(false);        
    setValgteRom(null);
  };

  const handterLydavspilling = async () => {
    try {
      if (somStarter) {
        await audioPlayerRef.current.stopAsync();  // Stopp lydavspillingen asynkront 
        setSomSpiller(false);  // Oppdater tilstanden for å indikere at lyden ikke spilles av
        clearInterval(intervalRef.current);  // Fjern intervallet for å stoppe fremdriftsoppdateringer
      } else {
        const audioPlayer = new Audio.Sound();  // Opprett et nytt lydavspillerobjekt 
        await audioPlayer.loadAsync(valgteRom.audio);  // Last den valgte lydfilen asynkront
        await audioPlayer.playAsync();  // Begynn å spille av den innlastede lyden asynkront
        audioPlayerRef.current = audioPlayer;  // Sett lydspillerreferansen til det nyopprettede lydavspillerobjektet
        setSomSpiller(true);  // Oppdater tilstanden for å indikere at lyden spilles av
        startPlaybackProgress();  // Begynn å oppdatere avspillingsfremdriften
      }
    } catch (error) {
      // Hvis det oppstår en feil under lydavspilling
      console.error('Det oppsto en feil under avspilling av lyd:', error);  
    }
  };
  const startPlaybackProgress = () => {
    intervalRef.current = setInterval(async () => {
      const status = await audioPlayerRef.current.getStatusAsync();  // Få statusen til lydspilleren asynkront
      const { positionMillis, durationMillis } = status;  // Destrukturer posisjonen og varigheten i millisekunder fra statusen
      const progress = positionMillis / durationMillis;  // Beregn avspillingfremdriften me prosessbaren
      setAvspillingProsess(progress);  
    }, 100);  // Still inn intervallet for å oppdatere hvert 100 millisekund
  };

  const formatPlaybackTime = (time) => {
    // Formater avspillingstid i minutter: sekunder format 
    const minuter = Math.floor(time / 60000);
    const sekunder = Math.floor((time % 60000) / 1000);
    return minuter + ':' + sekunder.toString().padStart(2, '0');
  };

  useEffect(() => {
    // Oppryddingsfunksjon når komponenten demonteres eller avhengighetsmatrisen endres 
    return () => {
      // Sjekk om lydspillerreferansen finnes 
      if (audioPlayerRef.current) {
        // Last ned lyden som er lastet asynkront 
        audioPlayerRef.current.unloadAsync();
      }
      // Sjekk om intervallreferansen finnes 
      if (intervalRef.current) {
// Fjern intervallet for å stoppe de pågående fremdriftsoppdateringene 
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (harTilgang === null) {
    // Gjengi innlastingstilstand mens du ber om tillatelser
    return <Text>Ber om kameratillatelse</Text>;
  }
  if (harTilgang === false) {
    // Gjengi feilmelding hvis kameratillatelse nektes 
    return <Text>Ingen tilgang til kamera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {cameraOn && (
          <BarCodeScanner
            onBarCodeScanned={skannet ? undefined : handleBarKodeSkannet}
            style={StyleSheet.absoluteFillObject}
          >
            <View style={styles.cancelContainer}>
              <Button title="Avbryt" onPress={toggleCamera} />
            </View>
          </BarCodeScanner>
        )}

        {valgteRom && valgteRom.id === 1 && (
          <View style={styles.roomContainer}>
            <Text style={styles.roomTitle}>{valgteRom.name}</Text>
            <Image source={{ uri: valgteRom.image }} style={styles.roomImage} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.roomDescription}>{valgteRom.description}</Text>
              <View style={styles.audioContainer}>
                {somStarter ? (
                  <TouchableOpacity onPress={handterLydavspilling}>
                    <Image
                      source={require('../Bilder/stop1.png')}
                      style={styles.audioButton}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handterLydavspilling}>
                    <Image
                      source={require('../Bilder/play1.png')}
                      style={styles.audioButton}
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.progressBarContainer}>
                  <View
                    style={[styles.progressBar, { width: `${avspillingProsess * 100}%` }]}
                  ></View>
                </View>
              </View>
              <Text style={styles.progressText}>
                {formatPlaybackTime(valgteRom.duration * avspillingProsess)} /{' '}
                {formatPlaybackTime(valgteRom.duration)}
              </Text>
            </View>
          </View>
        )}

        {valgteRom && valgteRom.id === 2 && (
          <View style={styles.roomContainer}>
            <Text style={styles.roomTitle}>{valgteRom.name}</Text>
            <Image source={{ uri: valgteRom.image }} style={styles.roomImage} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.roomDescription}>{valgteRom.description}</Text>
              <View style={styles.audioContainer}>
                {somStarter ? (
                  <TouchableOpacity onPress={handterLydavspilling}>
                    <Image
                      source={require('../Bilder/stop1.png')}
                      style={styles.audioButton}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handterLydavspilling}>
                    <Image
                      source={require('../Bilder/play1.png')}
                      style={styles.audioButton}
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.progressBarContainer}>
                  <View
                    style={[styles.progressBar, { width: `${avspillingProsess * 100}%` }]}
                  ></View>
                </View>
              </View>
              <Text style={styles.progressText}>
                {formatPlaybackTime(valgteRom.duration * avspillingProsess)} /{' '}
                {formatPlaybackTime(valgteRom.duration)}
              </Text>
            </View>
          </View>
        )}

        {!cameraOn && !valgteRom && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Skann QR-koden i museet for å komme i gang!</Text>
            <Button title="Skann QR koden" onPress={toggleCamera} />
          </View>
        )}
      </View>

      <MenuBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#302e2b',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  roomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  roomImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    backgroundColor: 'grey',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
  },
  roomDescription: {
    fontSize: 15,
    marginBottom: 10,
    color: 'white',
    maxWidth: '90%',
    marginBottom: 20,
    padding: 1,
    textAlign: 'left',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioButton: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 2,
    flex: 1,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'orange',
  },
  progressText: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
});

export default SkannSide;