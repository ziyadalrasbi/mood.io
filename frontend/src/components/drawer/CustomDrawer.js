import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDrawerStyles from './CustomDrawerStyles';
import * as SecureStore from 'expo-secure-store';
import { signOut, refreshAccessToken, getUserProfile } from '../../fetch';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import defaultimg from '../../../assets/icons/stats/default.png';

const CustomDrawer = ({ props, navigation, route, options }) => {

    const [profile, setProfile] = useState({ name: "", picture: "", followers: "" });
    const [loaded] = useFonts({
        MontserratBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
        InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = await SecureStore.getItemAsync('spotify_access_token');
            const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
            var accessToken;
            await refreshAccessToken(token, refreshToken)
                .then(res => res.json())
                .then(data => {
                    if (data.token != "Null") {
                        accessToken = data.token;
                        SecureStore.setItemAsync('spotify_access_token', data.token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                    }
                })
                .then(() => {
                    getUserProfile(accessToken)
                        .then(res => res.json())
                        .then(data => {
                            setProfile({ name: data.profile.name, picture: data.profile.picture, followers: data.profile.followers });
                        })
                })
        }
        fetchData();
    }, [])

    if (!loaded) {
        return null;
    }

    const signOutUser = async () => {
        try {
            await SecureStore.deleteItemAsync('spotify_access_token');
            await SecureStore.deleteItemAsync('spotify_refresh_token');
            await SecureStore.deleteItemAsync('database_access_token');
            await SecureStore.deleteItemAsync('user_id');
            await signOut()
                .then(() => {
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#0d324d' }}>
            <View style={CustomDrawerStyles.firstContainer}>
                <Image
                    style={CustomDrawerStyles.profilePicture}
                    source={profile.picture != null ? { uri: profile.picture } : defaultimg}
                />
                <Text style={CustomDrawerStyles.firstHeader}>
                    {profile.name}
                </Text>
            </View>
            <DrawerContentScrollView
                {...props}
            >
                <View style={{ alignItems: 'flex-start', marginTop: -50, width: '100%' }}>
                    <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('Home')}>
                        <Text style={CustomDrawerStyles.optionText}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CustomDrawerStyles.drawerTouchable}  onPress={() => navigation.navigate('UploadOptions')}>
                        <Text style={CustomDrawerStyles.optionText}>
                            Discover Music
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('UserStats', { index: 0 })}>
                        <Text style={CustomDrawerStyles.optionText}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('Recommendations')}>
                        <Text style={CustomDrawerStyles.optionText}>
                            Previous Recommendations
                        </Text>
                    </TouchableOpacity>
                    <Text style={CustomDrawerStyles.optionText}>
                        Listening Habits
                    </Text>
                    <Text style={CustomDrawerStyles.optionText}>
                        About mood.io
                    </Text>
                    <Text style={CustomDrawerStyles.optionText}>
                        Contact
                    </Text>
                    <Text style={CustomDrawerStyles.optionText}>
                        Report Issue
                    </Text>
                    <TouchableOpacity onPress={() => signOutUser()}>
                        <Text style={CustomDrawerStyles.logOutText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>

        </View>
    );
}

export default CustomDrawer;