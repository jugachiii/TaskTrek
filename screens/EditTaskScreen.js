// screens/EditTaskScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedButton from '../components/AnimatedButton';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();



export default function EditTaskScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('');

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <LinearGradient
      
    >

      {/* Here you will add your Form later for editing tasks */}

      <AnimatedButton title="Back to Tasks" onPress={() => navigation.navigate('TaskList')} />
    </LinearGradient>
  );


  const loadTask = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = JSON.parse(storedTasks) || [];
      const task = tasks.find((t) => t.id === taskId);

      if (task) {
        setTaskTitle(task.title);
        setTaskCategory(task.category);
      }
    } catch (error) {
      console.error('Error loading task:', error);
    }
  };

  const saveEditedTask = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = JSON.parse(storedTasks) || [];

      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, title: taskTitle, category: taskCategory } : task
      );

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      Alert.alert('Success', 'Task updated!');
      navigation.navigate('TaskList');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <LinearGradient colors={['#0b0c10', '#1f2833']} style={styles.container}>
      <Text style={styles.title}>Edit Your Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholderTextColor="#c5c6c7"
      />

      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Work, Personal)"
        value={taskCategory}
        onChangeText={setTaskCategory}
        placeholderTextColor="#c5c6c7"
      />

      <AnimatedButton title="Save Changes" onPress={saveEditedTask} />
      <AnimatedButton title="Cancel" onPress={() => navigation.goBack()} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 28, color: '#66fcf1', textAlign: 'center', marginBottom: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: '#45a29e', 
    backgroundColor: '#1f2833', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 20, 
    color: '#ffffff'
  },
});
