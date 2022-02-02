import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import UserStatsStyles from './UserStatsStyles';
import Navbar from '../../components/navbar/Navbar';
import { getUserProfile, getUserTopTracks, getUserTopArtists } from '../../fetch';
import * as SecureStore from 'expo-secure-store';
import Loading from '../../components/loading/Loading';
import DropDownPicker from 'react-native-dropdown-picker';

function UserStats({ navigation }) {

    const [profile, setProfile] = useState({ name: "", picture: "", followers: null });
    const [loading, setLoading] = useState(true);
    const [topArtists, setTopArtists] = useState({ topArtists: [] });
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Short term', value: 'short_term' },
        { label: 'Medium term', value: 'medium_term' },
        { label: 'Long term', value: 'long_term' },
    ]);
    const [value, setValue] = useState('medium_term');

    const [loaded] = useFonts({
        InconsolataBold: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Inconsolata/static/Inconsolata/Inconsolata-Black.ttf')
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = await SecureStore.getItemAsync('spotify_access_token');
            await getUserProfile(token)
                .then(res => res.json())
                .then(data => {
                    setProfile({ name: data.profile.name, picture: data.profile.picture, followers: data.profile.followers });
                })
            await getUserTopArtists(token, 'medium_term')
                .then(res => res.json())
                .then(data => {
                    if (data != null) {
                        setTopArtists(data.artistNames);
                    }
                })
        }
        fetchData().then(() => setLoading(false));
    }, [loading])

    if (!loaded || loading) {
        return (
            <Loading page={"home"} />
        );
    }

    const changeRange = async (range) => {
        const token = await SecureStore.getItemAsync('spotify_access_token');
        await getUserTopArtists(token, range)
            .then(res => res.json())
            .then(data => {
                if (data != null) {
                    setTopArtists(data.artistNames);
                }
            })
    }

    return (
        <ScrollView style={UserStatsStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={UserStatsStyles.topContainer}>
                <Navbar page={'stats'} navigation={navigation} />
            </View>
            <View style={UserStatsStyles.mainContainer}>
                <View style={UserStatsStyles.firstContainer}>
                    <Image
                        style={UserStatsStyles.profilePicture}
                        source={{ uri: profile.picture }}
                    />
                    <Text style={UserStatsStyles.firstHeader}>
                        {profile.name}
                    </Text>
                    <Text style={UserStatsStyles.firstSubHeader}>
                        Followers: {profile.followers}
                    </Text>
                </View>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{ height: 40 }}
                    onChangeValue={item => changeRange(item)}
                />
                {topArtists.length > 0 && topArtists.map((artist, index) =>
                    <View key={index}>
                        <TouchableOpacity
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2, elevation: 5
                            }}
                            onPress={() => Linking.openURL(artist[2])}>
                            <Image
                                style={UserStatsStyles.topTrackArtistImage}
                                source={{ uri: artist[1] }}
                            />
                        </TouchableOpacity>
                        <Text style={UserStatsStyles.topArtistText}>{artist[0]}</Text>
                    </View>
                )}
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

export default UserStats;