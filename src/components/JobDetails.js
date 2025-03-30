import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job, onBookmarkChange } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedJobs');
      const savedJobs = bookmarks ? JSON.parse(bookmarks) : [];
      setIsBookmarked(savedJobs.some((savedJob) => savedJob.id === job.id));
    } catch (error) {
      console.error('Error checking bookmarks:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedJobs');
      let savedJobs = bookmarks ? JSON.parse(bookmarks) : [];

      if (isBookmarked) {
        savedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
      } else {
        savedJobs.push(job);
      }

      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(savedJobs));
      setIsBookmarked(!isBookmarked);

      if (onBookmarkChange) {
        onBookmarkChange();
      }
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <TouchableOpacity onPress={toggleBookmark}>
          <Ionicons 
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={28} 
            color="#FF8303"
          />
        </TouchableOpacity>
      </View>

      <Text><Text style={styles.label}>Location:</Text> {job.place}</Text>
      <Text><Text style={styles.label}>Salary:</Text> {job.salary}</Text>
      <Text><Text style={styles.label}>Vacancies:</Text> {job.vacancies}</Text>
      <Text><Text style={styles.label}>Contact No:</Text> {job.whatsapp_no}</Text>
      <Text><Text style={styles.label}>Job Hours:</Text> {job.job_hours}</Text>
      <Text><Text style={styles.label}>Job Role:</Text> {job.job_role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
  }
});

export default JobDetailsScreen;
