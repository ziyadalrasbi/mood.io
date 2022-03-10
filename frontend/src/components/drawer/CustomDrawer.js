import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDrawerStyles from './CustomDrawerStyles';
import * as SecureStore from 'expo-secure-store';
import { deleteUser, signOut } from '../../client/src/actions/dbActions';
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

    const [confirmDelete, setConfirmDelete] = useState(false);

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
                const tokenExpiry = await SecureStore.getItemAsync('token_expiry');
                const getToken = await dispatch(refreshAccessToken(token, refreshToken, tokenExpiry, tokenController.signal));
                const accessToken = getToken.refreshAccessToken.token;
                const time = getToken.refreshAccessToken.time;
                SecureStore.setItemAsync('spotify_access_token', accessToken, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
                SecureStore.setItemAsync('token_expiry', time, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

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
        const signOutController = new AbortController();
        try {
            await SecureStore.deleteItemAsync('spotify_access_token');
            await SecureStore.deleteItemAsync('spotify_refresh_token');
            await SecureStore.deleteItemAsync('user_id');
            await SecureStore.deleteItemAsync('token_expiry');
            await dispatch(signOut(signOutController.signal));
            await dispatch(spotifySignOut());
        } catch (error) {
            console.log('Error signing out, please try again. ' + error);
        }
        signOutController.abort();
        navigation.reset({ index: 0, routes: [{ name: 'LoginStack' }] });
    }

    const deleteAccount = async () => {
        const userId = await SecureStore.getItemAsync('user_id');
        const deleteController = new AbortController();
        try {
            await dispatch(deleteUser(userId, deleteController.signal));
            deleteController.abort();
            await signOutUser();
            setConfirmDelete(false);
        } catch (error) {
            console.log('Error deleting user, please try again. ' + error);
        }
    }

    const toggleDeleteStatus = () => {
        setConfirmDelete(true);
        setTimeout(() => {
            setConfirmDelete(false);
        }, 10000);
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
            <ScrollView
                {...props}
            >

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
                <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('Habits')}>
                    <Text style={CustomDrawerStyles.optionText}>
                        Listening Habits
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('About')}>
                    <Text style={CustomDrawerStyles.optionText}>
                        About mood.io
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CustomDrawerStyles.drawerTouchable} onPress={() => navigation.navigate('Contact')}>
                    <Text style={CustomDrawerStyles.optionText}>
                        Contact
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signOutUser()}>
                    <Text style={CustomDrawerStyles.logOutText}>
                        Log Out
                    </Text>
                </TouchableOpacity>
                {confirmDelete == false &&
                    <TouchableOpacity onPress={() => toggleDeleteStatus(true)}>
                        <Text style={CustomDrawerStyles.logOutText}>
                            Delete mood.io Account
                        </Text>
                    </TouchableOpacity>
                }
                {confirmDelete == true &&
                    <View>
                        <Text style={CustomDrawerStyles.confirmDeleteHeader}>
                            Are you sure you want to delete your account?
                        </Text>
                        <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity onPress={() => setConfirmDelete(false)}>
                            <Text style={CustomDrawerStyles.cancel}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteAccount()}>
                            <Text style={CustomDrawerStyles.confirmDelete}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                }

            </ScrollView>

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