import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, ScrollView, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import ContactStyles from './ContactStyles';
import Navbar from '../../components/navbar/Navbar';

function ContactConfirm({ navigation }) {

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );

    return (
        <ScrollView style={ContactStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={ContactStyles.topContainer}>
                <Navbar page={'contactConfirm'} navigation={navigation} />
            </View>
            <View style={ContactStyles.mainContainer}>
                <Text style={ContactStyles.welcome}>
                    Thank You!
                </Text>
                <LottieView
                    source={require('./animations/2309-check-animation.json')}
                    autoPlay
                    loop={false}
                    style={ContactStyles.lottie}
                />
                <Text style={ContactStyles.subWelcome}>
                    Your query has been sent and will be reviewed. Once again,
                    thank you for getting in touch! Press the button below to head back home.
                </Text>
                <Button
                    style={ContactStyles.startButton}
                    uppercase={false}
                    mode="contained"
                    labelStyle={ContactStyles.mainFont}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
                >
                    Home
                </Button>
            </View>
        </ScrollView>
    )
}

export default ContactConfirm;