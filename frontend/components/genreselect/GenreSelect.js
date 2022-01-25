import React, { useRef, } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import GenreSelectStyles from './GenreSelectStyles';
import { useFonts } from 'expo-font';
import { getUserId, searchForArtists } from '../../fetch';
import * as SecureStore from 'expo-secure-store';
import { Searchbar } from 'react-native-paper';
import { saveUserGenres } from '../../fetch';
const GenreSelect = ({ seeds }) => {

  const [loaded] = useFonts({
    InconsolataBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
    InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });

  const ref = useRef(null);
  const [items, setItems] = React.useState([]);

  const [query, setQuery] = React.useState('');

  const [searchTimer, setSearchTimer] = React.useState(null);

  const [selectedItems, setSelectedItems] = React.useState([]);

  const search = async (query) => {
    const token = await SecureStore.getItemAsync('spotify_access_token');
    await searchForArtists(token, query)
      .then(res => res.json())
      .then(data => {
        setItems(data.artists);
      })

  }

  const selectItem = async (item) => {
    const prevItem = [...selectedItems];
    prevItem.unshift(item);
    setSelectedItems(prevItem);
    console.log(selectedItems);
  }

  const removeItem = async (item) => {
    const prevItem = [...selectedItems];
    var index = prevItem.indexOf(item);
    prevItem.splice(index, 1);
    setSelectedItems(prevItem);
  }

  const clearItems = async () => {
    const currItems = [];
    setSelectedItems(currItems);
  }

  const saveSelected = async () => {
    const token = await SecureStore.getItemAsync('spotify_access_token');
    const currItems = [...selectedItems];
    const artists = currItems.map(artist => artist.id);
    await getUserId(token)
    .then(res => res.json())
    .then(data => {
      saveUserGenres(data.id, artists);
    })
   
  }

  return (
    <View style={{ height: 400 }}>
      <Searchbar
        placeholder='search'
        onChangeText={(text => {
          if (searchTimer) {
            clearTimeout(searchTimer);
          }
          setQuery(text);
          setSearchTimer(
            setTimeout(() => {
              search(text);
            }, 2000),
          );
        })}
        value={query}
        style={{ width: '100%' }}
      />
      <View style={{ flexDirection: 'column' }}>

        <FlatList
          data={items}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={{ padding: 10, backgroundColor: 'grey', marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>{item.title}</Text>
              <Button
                disabled={selectedItems.length < 5 ? false : true}
                // style={HomeStyles.startButton}
                uppercase={false}
                mode="contained"
                // labelStyle={HomeStyles.mainFont}
                onPress={() => selectItem(item)}
              >
                add
              </Button>
            </View>
          )}
        />

        <FlatList
          data={selectedItems}
          horizontal={true}
          numColumns={1}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={{ padding: 10, marginRight: 10, height: 60, backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
              <Text>{item.title}</Text>
              <Button
                // style={HomeStyles.startButton}
                uppercase={false}
                mode="contained"
                // labelStyle={HomeStyles.mainFont}
                onPress={() => removeItem(item)}
              >
                remove
              </Button>
            </View>
          )}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Button
        disabled={selectedItems.length > 0 ? false : true}
          // style={HomeStyles.startButton}
          uppercase={false}
          mode="contained"
          // labelStyle={HomeStyles.mainFont}
          onPress={clearItems}
        >
          clear
        </Button>
        <Button
        disabled={selectedItems.length < 5 ? true : false}
          // style={HomeStyles.startButton}
          uppercase={false}
          mode="contained"
          // labelStyle={HomeStyles.mainFont}
          onPress={saveSelected}
        >
          continue
        </Button>
      </View>
    </View>

  )
}

export default GenreSelect;