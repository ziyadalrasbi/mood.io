import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useFonts } from 'expo-font'
import GenreModalStyles from './GenreModalStyles';
import GenreSelect from '../genreselect/GenreSelect';
import { StatusBar } from 'expo-status-bar';

function GenreModal({ newUser, navigation }) {

  const [modalVisible, setModalVisible] = useState(newUser);

  return (
    <View style={[GenreModalStyles.modalContainer, { display: newUser == true ? 'flex' : 'none' }]}>
      <StatusBar style="auto" />
      <View style={GenreModalStyles.centeredView}>
        <Modal
          visible={modalVisible}
        >
          <View style={GenreModalStyles.centeredView}>
            <View style={GenreModalStyles.modalView}>
              <Text style={GenreModalStyles.modalTitleText}>Before continuing...</Text>
              <Text style={GenreModalStyles.modalSubText}>It seems that you have signed in with a new or unused Spotify account.
                Before proceeding, please enter your top 5 music artists below (this is a one time setup). After using Spotify more,
                we can extract your top artists automatically!</Text>
              <GenreSelect navigation={navigation} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default GenreModal;