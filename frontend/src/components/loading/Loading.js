import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import LoadingStyles from './LoadingStyles';
import AnimatedLoader from 'react-native-animated-loader';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import logo from '../../../assets/icons/testlogo.png'
import LottieView from 'lottie-react-native';
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
            {page == "login" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#6a93cb', '#6a93cb']}
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
            {page == "stats" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#2980b9', '#2c3e50']}
                    style={LoadingStyles.gradientContainer}
                />
            }
            {page == "habits" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#2980b9', '#2c3e50']}
                    style={LoadingStyles.gradientContainer}
                />
            }
            {page == "recommendations" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#2980b9', '#2c3e50']}
                    style={LoadingStyles.gradientContainer}
                />
            }
            {page == "results" &&
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#373B44', '#4286f4']}
                    style={LoadingStyles.gradientContainer}
                />
            }

            {page == "login" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/8809-fidget-spinner.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>Logging in</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }
            {page == "results" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/3649-floral-loading-animation.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>Generating recommendations</Text>
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
                        <Text style={LoadingStyles.loadingText}>Loading your profile</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }
            {page == "stats" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/lf30_editor_onehe4fu.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>Loading your statistics</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }
            {page == "habits" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/lf30_editor_onehe4fu.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>Loading your habits</Text>
                        <AnimatedEllipsis
                            minOpacity={0.2}
                            animationDelay={200}
                            style={LoadingStyles.ellpsis}
                        />
                    </View>
                </AnimatedLoader>
            }
            {page == "recommendations" &&
                <AnimatedLoader
                    visible={true}
                    overlayColor="transparent"
                    animationStyle={LoadingStyles.lottie}
                    source={require('./animations/lf30_editor_onehe4fu.json')}
                    speed={1}>
                    <View style={LoadingStyles.loadingContainer}>
                        <Text style={LoadingStyles.loadingText}>Loading your recommendations</Text>
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
                    <LottieView
                        source={require('./animations/27-loading.json')}
                        autoPlay
                        loop
                        style={LoadingStyles.lottie}
                    />
                </View>
            }

        </View>
    )
}

export default Loading;