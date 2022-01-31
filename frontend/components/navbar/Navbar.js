import hamburger from '../../../assets/icons/home/hamburger.png';
import scanimg from '../../../assets/icons/home/scan.png';
import closeimg from '../../../assets/icons/home/close.png';
import NavbarStyles from './NavbarStyles';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

function Navbar({ navigation, name, scan, signOut }) {

  return (
    <View>
      {scan == true ?
        <View style={NavbarStyles.topBar}>
          <Image style={NavbarStyles.hamburger} source={hamburger} />
          <Text style={NavbarStyles.welcome}>
            Welcome, {name}!
          </Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Image style={NavbarStyles.scan} source={scanimg} />
          </TouchableOpacity>
        </View>
        :
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={NavbarStyles.close} source={closeimg} />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default Navbar;