import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LibgenSearch from './search_react';

const options = {
  mirror: 'http://gen.lib.rus.ec',
  query: 'cats',
  count: 5,
  sort_by: 'year',
  reverse: true
}
console.log("options: ", options);

let results = LibgenSearch(options);
console.log("results: ", results);

export default function App() {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
