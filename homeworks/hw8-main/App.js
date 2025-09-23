import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BadgerTabs from './src/components/navigation/BadgerTabs';
import PreferenceContext from './src/Contexts/PreferenceContext';
import { useState } from 'react';
export default function App() {
  const [preferences, setPreferences] = useState({});

  return(
    <PreferenceContext.Provider value={{ preferences, setPreferences }}>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
    </PreferenceContext.Provider>

  );
}
