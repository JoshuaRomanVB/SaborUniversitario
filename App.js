import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation/NavigationStack';
import { AuthProvider } from './src/context/AuthContext';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
    
    <NavigationContainer>
      <AuthProvider>
      <NavigationStack/>
      </AuthProvider>
    </NavigationContainer>
  );
}



