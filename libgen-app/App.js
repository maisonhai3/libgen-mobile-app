import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import LibgenSearch from './search_react';

const options = {
    mirror: 'http://gen.lib.rus.ec',
    query: 'Pragmatic Developer',
    // count: 5,
    sort_by: 'year',
    reverse: true
}

function RenderScrollView({data}) {
    return (
        <ScrollView>
            {data.map((item, index) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.item}
                    onPress={() => Alert.alert('Item MD5', item.md5)}
                >
                    <Text>{item.title}</Text>
                    <Text>{item.language}</Text>
                    <Text>{item.author}</Text>
                    <Text>{item.year}</Text>
                    <Text>{item.locator}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

RenderScrollView.propTypes = {
    data: PropTypes.array.isRequired
}

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        LibgenSearch(options).then(setData).catch(console.error);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>LibGen</Text>
            </View>

            <Text
                style={{padding: 20, fontSize: 30, color: 'black'}}>
                {/*numberOfLines={3}>*/}
                Welcome to <Text style={{fontWeight: 'bold'}}>LibGen</Text>
            </Text>

            <Text style={{padding: 20, fontSize: 20, color: 'black'}}>
                Searching for "<Text style={{fontWeight: 'bold'}}>{options.query}"</Text>
            </Text>

            <RenderScrollView data={data}/>

            <StatusBar style="auto"/>
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
    header: {
        width: '100%',
        padding: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        fontSize: 18,
        // height: 44,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d3d3d3',
    },
});