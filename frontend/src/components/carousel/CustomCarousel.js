import React, { useState, useCallback, useRef } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Image, TouchableOpacity } from 'react-native';
import spotifylogo from '../../../assets/icons/login/spotifylogo.png';
import musicicon from '../../../assets/icons/carousel/musicicon.png';
import moodicon from '../../../assets/icons/carousel/moodicon.png';
import improveicon from '../../../assets/icons/carousel/improveicon.png';
import statsicon from '../../../assets/icons/carousel/statsicon.png';
import playlisticon from '../../../assets/icons/carousel/playlisticon.png';
import CustomCarouselStyles from './CustomCarouselStyles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


const CustomCarousel = ({ onPressLogin }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  const data = [
    {
      title: 'mood.io: Music Recommender',
      text: 'Discover new music based on your mood and genre preference.',
      icon: musicicon
    },
    {
      title: 'Unique Playlists',
      text: 'Recommended music can be generated to playlists for you to save.',
      icon: playlisticon
    },
    {
      title: 'Detect Your Mood',
      text: 'Scan your face to detect your current mood instantly.',
      icon: moodicon
    },
    {
      title: 'Improve Your Mood',
      text: 'Feeling down? Receive music tailored to improving your mood.',
      icon: improveicon
    },
    {
      title: 'Your Listening Habits',
      text: 'View your listening habits, such as your top artists and tracks.',
      icon: statsicon
    },
  ];

  const renderItem = useCallback(({ item, index }) => (
    <View
      style={CustomCarouselStyles.carouselItem}
    >
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={CustomCarouselStyles.dotStyle}
        inactiveDotStyle={CustomCarouselStyles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.7}
      />
      <Text style={CustomCarouselStyles.welcome}>{item.title}</Text>
      <Text style={CustomCarouselStyles.subWelcome}>{item.text}</Text>
      <Image
        source={item.icon}
        style={CustomCarouselStyles.icon}
      />
      <TouchableOpacity
        style={CustomCarouselStyles.buttonContainer}
        activeOpacity={0.5}
        onPress={onPressLogin}
      >
        <Image
          source={spotifylogo}
          style={CustomCarouselStyles.spotifyLogo}
        />
        <View />
        <Text style={CustomCarouselStyles.mainFont}> &nbsp; LOGIN WITH SPOTIFY </Text>
      </TouchableOpacity>
    </View>
  ), []);


  return (
    <SafeAreaView style={CustomCarouselStyles.mainContainer}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          removeClippedSubviews={false}
          layout="default"
          ref={ref}
          data={data}
          sliderWidth={width / 1.035}
          itemWidth={width / 1.38}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomCarousel;