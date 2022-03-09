import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import LottieView from 'lottie-react-native';
import ContactStyles from './ContactStyles';
import Navbar from '../../components/navbar/Navbar';
import { useForm, Controller } from "react-hook-form";
import { submitQuery } from '../../client/src/actions/dbActions';
import { useDispatch } from 'react-redux';

function Contact({ navigation }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            message: ''
        }
    });

    const onSubmit = async data => {
        const submitController = new AbortController();
        try {
            await dispatch(submitQuery(data, submitController.signal));
        } catch (error) {
            console.log(error);
        }
        submitController.abort();
        navigation.navigate('ContactConfirm');
    }

    return (
        <ScrollView style={ContactStyles.scroll} showsVerticalScrollIndicator={false}>
            <View style={ContactStyles.topContainer}>
                <Navbar page={'contact'} navigation={navigation} />
            </View>
            <TouchableOpacity style={ContactStyles.mainContainer} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <Text style={ContactStyles.welcome}>
                    Contact Us
                </Text>
                <Text style={ContactStyles.subWelcome}>
                    Use the form below to contact us about any queries
                    or issues you may be facing.
                </Text>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Full Name'
                            placeholderTextColor={'grey'}
                            autoCapitalize='words'
                        />
                    )}
                    name="fullName"
                />
                {errors.fullName && <Text style={styles.error}>This is required.</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "This is required."
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Email'
                            placeholderTextColor={'grey'}
                            autoCapitalize='none'
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "This is required."
                        },
                        minLength: {
                            value: 20,
                            message: "Minimum 20 characters."
                        },
                        maxLength: {
                            value: 250,
                            message: "Maximum 250 characters."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.messageBox}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Message'
                            placeholderTextColor={'grey'}
                            multiline={true}
                        />
                    )}
                    name="message"
                />
                {errors.message && <Text style={styles.error}>{errors.message.message}</Text>}
            </TouchableOpacity>
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        padding: 8,
        backgroundColor: '#0e101c',
    },
    input: {
        backgroundColor: '#09263b',
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
        padding: 10,
        color: 'white',
        fontFamily: 'MontserratBold',
        width: '100%',
        marginTop: 20
    },
    messageBox: {
        backgroundColor: '#09263b',
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
        padding: 10,
        color: 'white',
        fontFamily: 'MontserratBold',
        width: '100%',
        height: 200,
        marginTop: 20
    },
    error: {
        color: 'red',
        fontFamily: 'MontserratBold',
        marginTop: 10
    }
});

export default Contact;