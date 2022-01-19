import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font'
import GenreModalStyles from './GenreModalStyles';


function GenreModal({ data }) {

    const [modalVisible, setModalVisible] = useState(data);
    
    return (
        <View style={GenreModalStyles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={GenreModalStyles.centeredView}>
                <View style={GenreModalStyles.modalView}>
                  <Text style={GenreModalStyles.modalTitleText}>Before we continue...</Text>
                  <Text style={GenreModalStyles.modalSubText}>It seems that you have signed in with a new or unused Spotify account, so we could not find your top genres. 
                  Before proceeding, please enter your preferred genres below (this is a one time setup). After using Spotify more, 
                  we can extract your top genres automatically!</Text>
                  <Button
                    style={[GenreModalStyles.button, GenreModalStyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={GenreModalStyles.textStyle}>Hide Modal</Text>
                  </Button>
                </View>
              </View>
            </Modal>
            {/* <Pressable style={[GenreModalStyles.button, GenreModalStyles.buttonOpen]} onPress={() => setModalVisible(true)}>
              <Text style={GenreModalStyles.textStyle}>Show Modal</Text>
            </Pressable> */}
          </View>
    )
}

export default GenreModal;