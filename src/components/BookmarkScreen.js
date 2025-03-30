import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksScreen = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const navigation = useNavigation();

  const loadBookmarks = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedJobs');
      setBookmarkedJobs(bookmarks ? JSON.parse(bookmarks) : []);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  return (
    <View style={styles.container}>
      {bookmarkedJobs.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarks added.</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('JobDetails', {
                  job: item,
                  onBookmarkChange: loadBookmarks, 
                })
              }
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.place}</Text>
              <Text>{item.salary}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookmarksScreen;
