import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import LoadingStyles from './LoadingStyles';
import AnimatedLoader from 'react-native-animated-loader';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import logo from '../../../assets/icons/testlogo.png'

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
            {page == 'main' &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#185a9d', '#4ca1af']}
                    style={LoadingStyles.gradientContainer}
                />
            }
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
                    colors={['#09203f', '#537895']}
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
                        <Text style={LoadingStyles.loadingText}>Generating Recommendations</Text>
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
                    source={require('./animations/27-loading.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>Loading Your Profile</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }
            {page == 'main' &&
                <View style={LoadingStyles.firstContainer}>
                    <Image
                    style={LoadingStyles.logo}
                    source={logo}
                  />
                </View>
            }

        </View>
    )
}

export default Loading;