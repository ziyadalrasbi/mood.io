import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDrawerStyles from './CustomDrawerStyles';
import * as SecureStore from 'expo-secure-store';
import { signOut } from '../../client/src/actions/dbActions';
import { refreshAccessToken, getUserProfile, spotifySignOut } from '../../client/src/actions/spotifyActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import defaultimg from '../../../assets/icons/stats/default.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

const CustomDrawer = ({ props, navigation }) => {

    const dispatch = useDispatch();


    const userProfile = useSelector(state => state.spotifyReducer.getUserProfile);
    const [loading, setLoading] = useState(true);

    const [loaded] = useFonts({
        MontserratBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
        InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    });

    useEffect(() => {
        const tokenController = new AbortController();
        const getProfileController = new AbortController();

        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync('spotify_access_token');
                const refreshToken = await SecureStore.getItemAsync('spotify_refresh_token');
                const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenController.signal));
                const accessToken = getToken.refreshAccessToken;
                SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

                await dispatch(getUserProfile(accessToken, getProfileController.signal));
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
        setLoading(false);

        return () => {
            tokenController.abort();
            getProfileController.abort();
        }
    }, [loading, dispatch]);

    if (!loaded || loading) {
        return null;
    }

    const signOutUser = async () => {
        await SecureStore.deleteItemAsync('spotify_access_token');
        await SecureStore.deleteItemAsync('spotify_refresh_token');
        await SecureStore.deleteItemAsync('user_id');
        await dispatch(signOut());
        await dispatch(spotifySignOut());
        navigation.reset({ index: 0, routes: [{ name: 'LoginStack' }] });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#0d324d' }}>
            {userProfile.profile != null &&
                <View style={CustomDrawerStyles.firstContainer}>
                    <Image
                        style={CustomDrawerStyles.profilePicture}
                        source={userProfile.profile.picture != null ? { uri: userProfile.profile.picture } : defaultimg}
                    />
                    <Text style={CustomDrawerStyles.firstHeader}>
                        {userProfile.profile.name}
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
        spotifySignOut: state.spotifyReducer.spotifySignOut,
        signOut: state.dbReducer.signOut
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshAccessToken,
    getUserProfile,
    spotifySignOut,
    signOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);