import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MyStack from './src/navigation';
import axios from "axios";

axios.defaults.baseURL = 'http://192.168.130.22:1337/api/'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto'/>
      <MyStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
