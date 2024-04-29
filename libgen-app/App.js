import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { useEffect, useState } from 'react';

import LibgenSearch from './search_react';

const options = {
  mirror: 'http://gen.lib.rus.ec',
  query: 'Pragmatic Developer',
  // count: 5,
  sort_by: 'year',
  reverse: true
}

async function fetchData() {
  let results = await LibgenSearch(options);
  console.log("result from LibgenSearch: ", results);
}

fetchData();

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let results = await LibgenSearch(options);
    setData(results);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item, index) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.language}</Text>
            <Text>{item.author}</Text>
            <Text>{item.year}</Text>
            <Text>{item.locator}</Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    // height: 44,
    margin: 10,
  },
});