import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import GenreModalStyles from './GenreModalStyles';
import GenreSelect from '../genreselect/GenreSelect';

function GenreModal({ newUser, navigation }) {

  const [modalVisible, setModalVisible] = useState(newUser);

  return (
    <Modal
      visible={modalVisible}
      dismissable={false}
    >
      <View style={GenreModalStyles.modalView}>
        <Text style={GenreModalStyles.modalTitleText}>Before continuing...</Text>
        <Text style={GenreModalStyles.modalSubText}>It seems that you have signed in with a new or unused Spotify account.
          Before proceeding, please enter your top 5 music artists below (this is a one time setup). After using Spotify more,
          we can extract your top artists automatically!
        </Text>
        <GenreSelect navigation={navigation} />
      </View>
    </Modal>
  )
}

export default GenreModal;