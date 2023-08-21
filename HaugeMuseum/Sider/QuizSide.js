import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MenuBar from '../Komponenter/MenuBar';
import styles from '../Styles/QuizSideStyling';


const quizSporsmol = [      // Skriver inn spørsmål, alternativene og svarene 

  {
    sporsmol: 'Hva var Hans Hauge Mindes yrke?',  // Spørsmål
    alternativer: ['Maler', 'Forfatter', 'Musiker', 'Arkitekt'], //Alternativer
    riktigeSvar: 'Forfatter', //Riktig svar
  },
  {
    sporsmol: 'Hvilken periode levde Hans Hauge Minde i?',
    alternativer: ['16. århundre', '17. århundre', '18. århundre', '19. århundre'],
    riktigeSvar: '18. århundre',
  },
  {
    sporsmol: 'Hva er Hans Hauge Mindes mest kjente bidrag eller prestasjon?',
    alternativer: ['Oppdagelsen av penicillin', 'Utviklingen av teorien om relativitet', 'Oppdagelsen av gravitasjonslovene', 'Skrivingen av den norske nasjonalsangen'],
    riktigeSvar: 'Skrivingen av den norske nasjonalsangen',
  },
  {
    sporsmol: 'Hvilket fagområde var Hans Hauge Minde spesielt interessert i?',
    alternativer: ['Biologi', 'Filosofi', 'Matematikk', 'Historie'],
    riktigeSvar: 'Filosofi',
  },
  {
    sporsmol: 'Hvor kan man finne Hans Hauge Mindes verk eller etterlatenskaper i dag?',
    alternativer: ['Louvre-museet i Paris', 'British Museum i London', 'Nasjonalmuseet i Oslo', 'Guggenheim-museet i New York'],
    riktigeSvar: 'Nasjonalmuseet i Oslo',
  },

  {
    sporsmol: 'I hvilket årstall fikk Hans Nielsen Hauge den sterke åndsopplevelse?',
    alternativer: ['1805', '1796', '1786', '1806'],
    riktigeSvar: '1796',
  },

  {
    sporsmol: 'Hvor gammel var Hans Nielsen Hauge da han smidde sin første kniv? ',
    alternativer: ['11', '14', '15', '18'],
    riktigeSvar: '11',
  },

  {
    sporsmol: 'I hvilket årstall er gulvet i den eldre delen av museet lagt? ',
    alternativer: ['1845', '1812', '1735', '1786'],
    riktigeSvar: '1735',
  },

  {
    sporsmol: 'Hvor mange bøker skrev Hans Nielsen Hauge totalt? ',
    alternativer: ['9', '33', '22', '17'],
    riktigeSvar: '33',
  },

  {
    sporsmol: 'I hvilket årstall ble tilbygget, som nå er besøkssenter oppført? ',
    alternativer: ['1823', '1865', '1835', '1904'],
    riktigeSvar: '1835',
  },
];

const QuizSide = ({ navigation }) => {

  // Tilstandsvariabler for å administrere quiztilstand
  const [aktuellSporsmolIndex, setAktuellSporsmolIndex] = useState(0);  // Indeks for gjeldende spørsmål
  const [valgteSvar, setValgteSvar] = useState(null);  // Valgt svar
  const [riktigeSvar, setRiktigeSvar] = useState(0);  // Antall riktige svar
  const [quizFullfort, setQuizFullfort] = useState(false);  // Quiz fullført

  // Funksjon for å håndtere svarvalg
  const handterSvarValg = (answer) => {
    setValgteSvar(answer);
  };

  // Funksjon for å håndtere neste spørsmål
  const handterNesteSporsmol = () => {
    const aktuellSporsmol = quizSporsmol[aktuellSporsmolIndex];
    if (valgteSvar === aktuellSporsmol.riktigeSvar) {
      setRiktigeSvar(riktigeSvar + 1);
    }

    setValgteSvar(null);
    setAktuellSporsmolIndex(aktuellSporsmolIndex + 1);

    if (aktuellSporsmolIndex === quizSporsmol.length - 1) {
      setQuizFullfort(true);
    }
  };

  // Funksjon for å gjengi quizspørsmål
  const renderQuizSporsmol = () => {
    const aktuellSporsmol = quizSporsmol[aktuellSporsmolIndex];
    return (
      <>
        <Text style={styles.spørsmålTeller}>{`Spørsmål ${aktuellSporsmolIndex + 1}/${quizSporsmol.length}`}</Text>
        <View style={styles.spørsmålContainer}>
          <Text style={styles.sporsmol}>{aktuellSporsmol.sporsmol}</Text>
        </View>
        <View style={styles.alternativContainer}>
          <View style={styles.alternativRad}>
            <TouchableOpacity
              style={[
                styles.alternativ,
                valgteSvar === aktuellSporsmol.alternativer[0] && styles.valgtAlternativ,
                valgteSvar === aktuellSporsmol.alternativer[0] && valgteSvar !== aktuellSporsmol.riktigeSvar && styles.feilAlternativ,
              ]}
              onPress={() => handterSvarValg(aktuellSporsmol.alternativer[0])}
              disabled={valgteSvar !== null}
            >
              <Text style={styles.alternativTekst}>{aktuellSporsmol.alternativer[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.alternativ,
                valgteSvar === aktuellSporsmol.alternativer[1] && styles.valgtAlternativ,
                valgteSvar === aktuellSporsmol.alternativer[1] && valgteSvar !== aktuellSporsmol.riktigeSvar && styles.feilAlternativ,
              ]}
              onPress={() => handterSvarValg(aktuellSporsmol.alternativer[1])}
              disabled={valgteSvar !== null}
            >
              <Text style={styles.alternativTekst}>{aktuellSporsmol.alternativer[1]}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alternativRad}>
            <TouchableOpacity
              style={[
                styles.alternativ,
                valgteSvar === aktuellSporsmol.alternativer[2] && styles.valgtAlternativ,
                valgteSvar === aktuellSporsmol.alternativer[2] && valgteSvar !== aktuellSporsmol.riktigeSvar && styles.feilAlternativ,
              ]}
              onPress={() => handterSvarValg(aktuellSporsmol.alternativer[2])}
              disabled={valgteSvar !== null}
            >
              <Text style={styles.alternativTekst}>{aktuellSporsmol.alternativer[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.alternativ,
                valgteSvar === aktuellSporsmol.alternativer[3] && styles.valgtAlternativ,
                valgteSvar === aktuellSporsmol.alternativer[3] && valgteSvar !== aktuellSporsmol.riktigeSvar && styles.feilAlternativ,
              ]}
              onPress={() => handterSvarValg(aktuellSporsmol.alternativer[3])}
              disabled={valgteSvar !== null}
            >
              <Text style={styles.alternativTekst}>{aktuellSporsmol.alternativer[3]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {valgteSvar !== null && (
          <TouchableOpacity style={styles.nesteKnapp} onPress={handterNesteSporsmol}>
            <Text style={styles.nesteKnappTekst}>
              {aktuellSporsmolIndex === quizSporsmol.length - 1 ? 'Fullfør' : 'Neste'}
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  
 // Funksjon for å gjengi quizresultat
 const renderQuizResultat = () => {
  return (
    <View style={styles.quizResultatContainer}>
      <Text style={styles.quizResultatOverskriftTekst}>Resultater</Text>
      <Text style={styles.quizResultatTekst}>{`Du fikk ${riktigeSvar} ut av ${quizSporsmol.length} riktige!`}</Text>
      <TouchableOpacity style={styles.omstartKnapp} onPress={omstartQuiz}>
        <Text style={styles.omstartKnappTekst}>Prøv igjen?</Text>
      </TouchableOpacity>
    </View>
  );
};

// Funksjon for å begynne quiz på nytt
  const omstartQuiz = () => {
    setAktuellSporsmolIndex(0);
    setValgteSvar(null);
    setRiktigeSvar(0);
    setQuizFullfort(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizOverskrift}>Quiz</Text>
      {quizFullfort ? renderQuizResultat() : renderQuizSporsmol()}
      <MenuBar navigation={navigation} />
    </View>
  );
};



export default QuizSide;