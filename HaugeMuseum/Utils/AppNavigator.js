// navigator.js
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Hjemside from '../Sider/HjemSide';
import SkannSide from '../Sider/SkannSide';
import QuizSide from '../Sider/QuizSide';
import SamletSide from '../Sider/SamletSide';

const AppNavigator = createStackNavigator(
  {
    // Vi velger og skriver inn sidene vi ønsker at det skal linke til 
    Hjem: Hjemside,
    Skann: SkannSide,
    Quiz: QuizSide,
    Samlet: SamletSide,
  },
  {
    initialRouteName: 'Hjem', // Vi skriver inn startskjermen, hvor den først skal linke til
    headerMode: 'none', // Skjul navigasjonsoverskriften som opprinnelig er på toppen
  }
);

export default createAppContainer(AppNavigator);
