import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import LibgenSearch from './search_react';
import React from 'react';
import testData from './test_data.json';

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
    <>
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: "red"}}>
        <View style={{flex: 0.3, flexDirection: 'column', backgroundColor: "green", alignItems:"center", justifyContent: "center"}}>
          <Text style={{fontWeight: 'light'}} numberOfLines={1}>Lib<Text style={{fontWeight: 'bold'}}>Gen</Text> </Text> 
        </View>
        <ScrollView style={{flex: 0.7, backgroundColor: 'gray', paddingHorizontal: 40, paddingVertical: 40}}>
          <ScrollView style={{backgroundColor: 'gray', paddingHorizontal: 40, paddingVertical: 40}}>
            {testData.map((item, index) => (
              <View key={index} style={{backgroundColor: "blue", borderColor: "red", borderWidth: 1, padding: 10}}>
                <Text>{item.language}</Text>
                <Text>{item.lbc}</Text>
                <Text>{item.lcc}</Text>
                <Text>{item.library}</Text>
                <Text>{item.local}</Text>
                <Text>{item.locator}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
      {/* <View>
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
      </View> */}
    </>
  );
}