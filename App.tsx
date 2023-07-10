import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCardPress = albumId => {
    Alert.alert('Album ID', `Selected Album ID: ${albumId}`);
  };

  return (
    <View style={styles.background}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item.albumId)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.thumbnail}>{item.thumbnailUrl}</Text>
            <Text style={styles.id}>ID: {item.id}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  thumbnail: {
    fontSize: 14,
    marginBottom: 3,
  },
  id: {
    fontSize: 14,
    color: 'gray',
  },
});
export default App;
