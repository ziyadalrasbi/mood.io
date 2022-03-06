import React, { useState } from "react";
import { View, Text } from "react-native";
import { Dialog, Button, Provider } from 'react-native-paper';
import ResultsErrorStyles from './ResultsErrorStyles';
import { LinearGradient } from 'expo-linear-gradient';

function ResultsError({ navigation }) {

    const [visible, setVisible] = useState(true);

    const hideDialog = () => {
        setVisible(false);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    return (
        <Provider>
            <View style={{ flex: 1, backgroundColor: 'grey' }}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#185a9d', '#4ca1af']}
                    style={ResultsErrorStyles.gradientContainer}
                />
                <Dialog dismissable={false} visible={visible} onDismiss={hideDialog} style={{ borderRadius: 5 }}>
                    <Dialog.Title style={ResultsErrorStyles.welcome}>
                        Oops!
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text style={ResultsErrorStyles.subWelcome}>
                            An error occured generating your recommendations. This error has been logged and will be looked into.
                            Please try again, or try signing in and out of the application.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={hideDialog}
                            uppercase={false}
                            style={ResultsErrorStyles.button}
                            labelStyle={ResultsErrorStyles.buttonLabel}
                        >
                            Home
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        </Provider>
    );
}

export default ResultsError;