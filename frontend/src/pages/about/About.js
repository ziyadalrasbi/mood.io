import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AboutStyles from './AboutStyles';
import Navbar from '../../components/navbar/Navbar';

function About({ navigation }) {

    // const data = [
    //     {
    //       title: 'mood.io: Music Recommender',
    //       text: 'Discover new music based on your mood and genre preference.',
    //       icon: musicicon
    //     },
    //     {
    //       title: 'Unique Playlists',
    //       text: 'Recommended music can be generated to playlists for you to save.',
    //       icon: playlisticon
    //     },
    //     {
    //       title: 'Detect Your Mood',
    //       text: 'Scan your face to detect your current mood instantly.',
    //       icon: moodicon
    //     },
    //     {
    //       title: 'Improve Your Mood',
    //       text: 'Feeling down? Receive music tailored to improving your mood.',
    //       icon: improveicon
    //     },
    //     {
    //       title: 'Your Listening Habits',
    //       text: 'View your listening habits, such as your top artists and tracks.',
    //       icon: statsicon
    //     },
    //   ];

    return (
        <ScrollView style={AboutStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={AboutStyles.topContainer}>
                <Navbar page={'contact'} navigation={navigation} />
            </View>
            <View style={AboutStyles.mainContainer}>
                <Text style={AboutStyles.welcome}>
                    About Us
                </Text>
                <Text style={AboutStyles.headerText}>
                    1. mood.io: Music Recommender
                </Text>
                <Text style={AboutStyles.headerSubText}>
                    mood.io was built on the hypothesis that music can be used to improve a person's mood.
                    Based on that, the main purpose of the application is to improve a user's mental health
                    by recommending them music aimed to better their mood, which they can save as playlists to
                    their Spotify profile.
                </Text>

                <Text style={AboutStyles.headerText}>
                    2. Mood Detection
                </Text>
                <Text style={AboutStyles.headerSubText}>
                    Face detection has been put in place to accurately detect a user's mood using their facial
                    expressions. Images are not stored at any point in the process; however, some users may not
                    feel comfortable using their face, so the option to select a mood from a list of options is
                    also available.
                </Text>
                <Text style={AboutStyles.headerText}>
                    3. Spotify Statistics
                </Text>
                <Text style={AboutStyles.headerSubText}>
                    Users are able to view their statistics on Spotify such as their top artists and tracks. The
                    option to filter data in a given time range is also available.
                </Text>
                <Text style={AboutStyles.headerText}>
                    4. Listening Habits
                </Text>
                <Text style={AboutStyles.headerSubText}>
                    Users can analyse their listening habits and view information such as how energetic the music
                    they listen to is, how fast paced (BPM) the music they listen to is, and more.
                </Text>
                <Text style={AboutStyles.headerText}>
                    5. Profile Statistics
                </Text>
                <Text style={AboutStyles.headerSubText}>
                    Users will also be able to view information unique to their mood.io profile such as their most
                    frequent moods and recent recommendations.
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Text style={AboutStyles.contactText}>
                    Any questions? Click here to head over to the contact page to send us a query!
                </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default About;