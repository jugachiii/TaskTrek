// screens/AddTaskScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DarkModeContext } from '../contexts/DarkModeContext';
import * as Notifications from 'expo-notifications';
import AnimatedButton from '../components/AnimatedButton';

export default function AddTaskScreen({ navigation }) {
  const { darkMode } = useContext(DarkModeContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Task title cannot be empty!');
      return;
    }

    // Simulate saving task (you can later connect to database or AsyncStorage)
    console.log({ title, description, category, deadline });

    // Schedule notification
    await scheduleNotification();

    Alert.alert('Task Added!', `Task "${title}" scheduled successfully.`);
    navigation.navigate('TaskList');
  };

  const scheduleNotification = async () => {
    const triggerTime = new Date(deadline);
    triggerTime.setMinutes(triggerTime.getMinutes() - 30); // 30 minutes before deadline

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Task Reminder!',
        body: `Your task "${title}" is almost due!`,
      },
      trigger: {
        date: triggerTime,
      },
    });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  return (
    <LinearGradient
      colors={darkMode ? ['#0b0c10', '#1f2833'] : ['#d5f4ff', '#a6e4f9']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: darkMode ? '#ffffff' : '#000000' }]}>
        Create New Task
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }]}
        placeholder="Task Title"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }]}
        placeholder="Task Description"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={description}
        onChangeText={setDescription}
      />

      <View style={[styles.pickerContainer, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
        <Picker
          selectedValue={category}
          style={{ color: darkMode ? '#fff' : '#000' }}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <Button
        title="Pick Deadline"
        color={darkMode ? "#00bfff" : "#0077cc"}
        onPress={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="datetime"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <AnimatedButton title="Save Task" onPress={handleAddTask} />
      <AnimatedButton title="Back to Tasks" onPress={() => navigation.navigate('TaskList')} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 15,
    borderRadius: 10,
  },
});
