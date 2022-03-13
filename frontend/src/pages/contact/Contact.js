import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import ContactStyles from './ContactStyles';
import Navbar from '../../components/navbar/Navbar';
import { useForm, Controller } from "react-hook-form";
import { submitQuery } from '../../client/src/actions/dbActions';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

function Contact({ navigation }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            message: ''
        }
    });

    const onSubmit = async data => {
        setLoading(true);
        const submitController = new AbortController();
        try {
            await dispatch(submitQuery(data, submitController.signal));
        } catch (error) {
            console.log(error);
        }
        submitController.abort();
        navigation.navigate('ContactConfirm');
        setLoading(false);
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
                            style={ContactStyles.input}
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
                {errors.fullName && <Text style={ContactStyles.error}>This is required.</Text>}

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
                            style={ContactStyles.input}
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
                {errors.email && <Text style={ContactStyles.error}>{errors.email.message}</Text>}
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
                            style={ContactStyles.messageBox}
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
                {errors.message && <Text style={ContactStyles.error}>{errors.message.message}</Text>}
            </TouchableOpacity>
            {loading == false ?
                <Button
                    style={ContactStyles.submitButton}
                    uppercase={false}
                    mode="contained"
                    labelStyle={ContactStyles.submitText}
                    onPress={handleSubmit(onSubmit)}
                >
                    Submit
                </Button>
                :
                <LottieView
                    source={require('./animations/loading.json')}
                    style={ContactStyles.loading}
                    autoPlay
                    loop
                />
            }
        </ScrollView>
    )
}

export default Contact;