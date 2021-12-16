import hamburger from '../../../assets/icons/home/hamburger.png';
import scanimg from '../../../assets/icons/home/scan.png';
import NavbarStyles from './NavbarStyles';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

function Navbar({ scan, navigation }) {

    return (
        <View style={NavbarStyles.topBar}>
        <Image style={NavbarStyles.hamburger} source={hamburger} />
        {scan == true ? 
        <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
        <Image style={NavbarStyles.scan} source={scanimg}  />
          </TouchableOpacity>
        : null}
      </View>
    );
}

export default Navbar;