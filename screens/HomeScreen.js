// screens/HomeScreen.js
import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DarkModeContext } from '../contexts/DarkModeContext';
import AnimatedButton from '../components/AnimatedButton';

export default function HomeScreen({ navigation }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <LinearGradient
      colors={darkMode ? ['#0b0c10', '#1f2833'] : ['#d5f4ff', '#a6e4f9']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: darkMode ? '#ffffff' : '#000000' }]}>
        Welcome to TaskTrek 🚀
      </Text>

      <AnimatedButton title="Go to Task List" onPress={() => navigation.navigate('TaskList')} />
      <AnimatedButton title={darkMode ? "Switch to Light Mode 🌞" : "Switch to Dark Mode 🌑"} onPress={toggleDarkMode} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
