import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation/NavigationStack';
import { AuthProvider } from './src/context/AuthContext';
import 'react-native-gesture-handler';


export default function App() {
  return (
    
    <NavigationContainer>
      <AuthProvider>
      <NavigationStack/>
      </AuthProvider>
    </NavigationContainer>
  );
}



