import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import GenreSelectStyles from './GenreSelectStyles';
import { searchForArtists, refreshAccessToken } from '../../client/src/actions/spotifyActions';
import { saveUserArtists } from '../../client/src/actions/dbActions';
import * as SecureStore from 'expo-secure-store';
import { Searchbar } from 'react-native-paper';
import defaultimg from '../../../assets/icons/stats/default.png';
import LottieView from 'lottie-react-native';
import addimg from '../../../assets/icons/genreselect/add.png';
import removeimg from '../../../assets/icons/genreselect/remove.png';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const GenreSelect = ({ navigation }) => {

  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);

  const [query, setQuery] = React.useState('');

  const [searchTimer, setSearchTimer] = React.useState(null);

  const [selectedItems, setSelectedItems] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const search = async (query) => {
    const searchController = new AbortController();
    const tokenController = new AbortController();
    try {
      const token = await SecureStore.getItemAsync('spotify_access_token');
      const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
      const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
      const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenController.signal));
      const accessToken = getToken.refreshAccessToken.token;
      const time = getToken.refreshAccessToken.time;
      SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
      SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

      const searchQuery = await dispatch(searchForArtists(accessToken, query, searchController.signal));
      setItems(searchQuery.searchForArtists);
    } catch (error) {
      console.log('Error searching for artists, please try again. ' + error);
    }
    searchController.abort();
    tokenController.abort();
  }

  const selectItem = async (item) => {
    const prevItem = [...selectedItems];
    if (!prevItem.includes(item)) {
      prevItem.unshift(item);
    }
    setSelectedItems(prevItem);
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
    const saveArtistsController = new AbortController();
    try {
      const id = await SecureStore.getItemAsync('user_id');
      const currItems = [...selectedItems];
      const artists = currItems.map(artist => artist.id);
      await dispatch(saveUserArtists(id, artists, saveArtistsController.signal));

      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      console.log('Error saving artists, please try again. ' + error);
    }
    saveArtistsController.abort();
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <Searchbar
        placeholder='Search'
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
        style={{ width: '100%', height: height / 22.4 }}
      />
      <View style={{ flexDirection: 'column' }}>
        {!loading ?
          <FlatList
            data={items}
            style={{ marginTop: height / 89.6 }}
            renderItem={({ item }) => (
              <View style={{ borderWidth: 1, borderColor: 'grey', padding: width / 41.4, backgroundColor: 'transparent', marginBottom: height / 179.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
            source={require('./animations/loading.json')}
            autoPlay
            loop={true}
            style={{ marginTop: height / 29.8666667, width: width / 4.14, height: width / 4.14, alignSelf: 'center' }}
          />
        }

        <FlatList
          data={selectedItems}
          horizontal={true}
          numColumns={1}
          style={{ paddingVertical: height / 89.6 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginBottom: height / 89.6 }} onPress={() => removeItem(item)}>
              <View style={{ borderRadius: 5, padding: width / 41.4, marginRight: width / 41.4, height: height / 14.9333333, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Text style={GenreSelectStyles.removeArtistText}>
                  {item.title}
                </Text>
                <Image
                  style={GenreSelectStyles.removeImage}
                  source={removeimg}
                >
                </Image>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: height / 89.6, marginBottom: height / 44.8 }}>
          <Button
            disabled={selectedItems.length > 0 ? false : true}
            // style={GenreSelectStyles.startButton}
            uppercase={false}
            mode="contained"
            // labelStyle={HomeStyles.mainFont}
            onPress={clearItems}
          >
            clear
          </Button>
          <Button
            disabled={selectedItems.length < 5 ? true : false}
            // style={GenreSelectStyles.startButton}
            uppercase={false}
            mode="contained"
            // labelStyle={HomeStyles.mainFont}
            onPress={saveSelected}
          >
            continue
          </Button>
        </View>
      </View>

    </View>

  )
}

export default GenreSelect;