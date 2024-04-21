import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import LibgenSearch from './search_react';

const options = {
  mirror: 'http://gen.lib.rus.ec',
  query: 'cats',
  count: 5,
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
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <Text>{item.language}</Text>
          <Text>{item.lbc}</Text>
          <Text>{item.lcc}</Text>
          <Text>{item.library}</Text>
          <Text>{item.local}</Text>
          <Text>{item.locator}</Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}