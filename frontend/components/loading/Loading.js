import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LoadingStyles from './LoadingStyles';
import AnimatedLoader from 'react-native-animated-loader';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

function Loading({ page }) {

    const [loaded] = useFonts({
        MontserratBold: require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        InconsolataLight: require('../../../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        InconsolataMedium: require('../../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        InconsolataBlack: require('../../../assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
        InconsolataSemiExpanded: require('../../../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    });

    return (
        <View style={LoadingStyles.mainContainer}>
            {page == "results" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#c33764', '#1d2671']}
                    style={LoadingStyles.gradientContainer}
                />
            }
            {page == "home" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#4ca1af', '#c4e0e5']}
                    style={LoadingStyles.gradientContainer}
                />
            }
            {page == "results" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/1579-music-loading.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>generating recommendations</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }
            {page == "home" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/46472-lurking-cat.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>loading your profile</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }

        </View>
    )
}

export default Loading;