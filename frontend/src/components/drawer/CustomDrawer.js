import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDrawerStyles from './CustomDrawerStyles';
import * as SecureStore from 'expo-secure-store';
import { signOut } from '../../client/src/actions/dbActions';
import { refreshAccessToken, getUserProfile } from '../../client/src/actions/spotifyActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import defaultimg from '../../../assets/icons/stats/default.png';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const CustomDrawer = ({ props, navigation }) => {

    const dispatch = useDispatch();

    const isDrawerOpen = useDrawerStatus() === 'open';

    const [loading, setLoading] = useState(true);
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

            const getToken = await dispatch(refreshAccessToken(token, refreshToken));
            const accessToken = getToken.refreshAccessToken;
            SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
            const getProfile = await dispatch(getUserProfile(accessToken));
            setProfile({
                name: getProfile.getUserProfile.profile.name,
                picture: getProfile.getUserProfile.profile.picture,
                followers: getProfile.getUserProfile.profile.followers
            });
        }

        fetchData();
        setLoading(false);
    }, [loading]);

    if (!loaded || loading) {
        return null;
    }

    const signOutUser = async () => {
        await SecureStore.deleteItemAsync('spotify_access_token');
        await SecureStore.deleteItemAsync('spotify_refresh_token');
        await SecureStore.deleteItemAsync('database_access_token');
        await SecureStore.deleteItemAsync('user_id');
        await dispatch(signOut());
        navigation.reset({ index: 0, routes: [{ name: 'LoginStack' }] });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#0d324d' }}>
            {isDrawerOpen &&
                <View style={CustomDrawerStyles.firstContainer}>
                    <Image
                        style={CustomDrawerStyles.profilePicture}
                        source={profile.picture != null ? { uri: profile.picture } : defaultimg}
                    />
                    <Text style={CustomDrawerStyles.firstHeader}>
                        {profile.name}
                    </Text>
                </View>
            }
            <DrawerContentScrollView
                {...props}
            >
                <View style={CustomDrawerStyles.drawerContainer}>
                    <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('Home')}>
                        <Text style={CustomDrawerStyles.optionText}>
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('UploadOptions')}>
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

const mapStateToProps = (state) => {
    return {
        refreshAccessToken: state.spotifyReducer.refreshAccessToken,
        getUserProfile: state.spotifyReducer.getUserProfile,
        signOut: state.dbReducer.signOut
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshAccessToken,
    getUserProfile,
    signOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);