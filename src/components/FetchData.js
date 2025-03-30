import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import formatJobs from '../services/JobsFormat';

const FetchDataScreen = () => {
  const {
    data,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMoreData,
    handleRefresh,
    handleLoadMore,
  } = formatJobs();

  const navigation = useNavigation();

  const handleChat = (number) => {
    if (!number) {
      alert('Invalid WhatsApp number');
      return;
    }

    let cleanedNumber = number.replace(/\s+/g, '');

    if (!cleanedNumber.startsWith('+91')) {
      cleanedNumber = `+91${cleanedNumber}`;
    }

    const url = `https://wa.me/${cleanedNumber}`;

    Linking.openURL(url).catch(() => {
      alert('Could not open WhatsApp');
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
          >
            <View style={styles.jobDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>
                <Ionicons name='location-outline' color='grey' size={14} style={{ marginRight: 5 }} />{' '}
                {item.place}
              </Text>
              <Text >
                <Ionicons name='person-outline' color='grey' size={14} /> {item.vacancies}
              </Text>
              <Text>
                <Ionicons name='cash-outline' color='grey' size={14} style={{ marginRight: 5 }}/> 
                {item.salary}

              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.chatButton]} onPress={() => handleChat(item.whatsapp_no)}>
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => navigation.navigate('JobDetails', { job: item })}
              >
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          hasMoreData ? (
            loadingMore ? (
              <ActivityIndicator size="small" style={styles.loader} />
            ) : (
              <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )
          ) : (
            <Text style={styles.endText}>End</Text>
          )
        }
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  jobDetails: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  chatButton: {
    backgroundColor: '#25D366', 
  },
  applyButton: {
    backgroundColor: '#007bff', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
  },

  loadMoreButton: {
    padding: 10,
    backgroundColor: '#a0a0a0',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  endText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'gray',
  },
});

export default FetchDataScreen;
