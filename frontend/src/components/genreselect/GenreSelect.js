import React, { useRef, } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
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
import defaultimg from '../../../assets/icons/stats/default.png';
import LottieView from 'lottie-react-native';
import addimg from '../../../assets/icons/genreselect/add.png';
import removeimg from '../../../assets/icons/genreselect/remove.png';

const GenreSelect = ({ navigation }) => {


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

  const [loading, setLoading] = React.useState(false);
  const search = async (query) => {
    const token = await SecureStore.getItemAsync('spotify_access_token');
    await searchForArtists(token, query)
      .then(res => res.json())
      .then(data => {
        console.log(data.artists);
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
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      })

  }

  return (
    <View style={{ height: 400 }}>
      <Searchbar
        placeholder='search'
        onChangeText={(text => {
          if (searchTimer) {
            clearTimeout(searchTimer);
            setLoading(true);
          }
          setQuery(text);
          setSearchTimer(
            setTimeout(() => {
              setLoading(false);
              search(text);
            }, 2000),
          );
        })}
        value={query}
        style={{ width: '100%' }}
      />
      <View style={{ flexDirection: 'column' }}>
        {!loading ?
          <FlatList
            data={items}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <View style={{ borderWidth: 1, borderColor: 'grey', padding: 10, backgroundColor: 'transparent', marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={GenreSelectStyles.artistImage}
                    source={item.picture != false ? { uri: item.picture } : defaultimg}
                  >
                  </Image>
                  <Text style={GenreSelectStyles.artistText}>
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <Image
                    style={[GenreSelectStyles.addImage, { display: selectedItems.length < 5 ? 'flex' : 'none' }]}
                    source={addimg}
                  >
                  </Image>
                </TouchableOpacity>
               
              </View>
            )}
          />
          :
          <LottieView
            source={require('./animations/142-loading-animation.json')}
            autoPlay
            loop={true}
            style={{ marginTop: 30, width: 100, height: 100, alignSelf: 'center' }}
          />
        }

        <FlatList
          data={selectedItems}
          horizontal={true}
          numColumns={1}
          style={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View style={{ borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding: 10, marginRight: 10, height: 60, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
              <Text style={GenreSelectStyles.removeArtistText}>
                {item.title}
              </Text>
              <TouchableOpacity onPress={() => removeItem(item)}>
                  <Image
                    style={GenreSelectStyles.removeImage}
                    source={removeimg}
                  >
                  </Image>
                </TouchableOpacity>
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