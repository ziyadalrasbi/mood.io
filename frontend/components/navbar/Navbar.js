import hamburger from '../../../assets/icons/home/hamburger.png';
import scanimg from '../../../assets/icons/home/scan.png';
import closeimg from '../../../assets/icons/home/close.png';
import backimg from '../../../assets/icons/upload/back.png';
import NavbarStyles from './NavbarStyles';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

function Navbar({ navigation, name, page, signOut }) {

  return (
    <View>
      {page == 'home' &&
        <View style={NavbarStyles.topBar}>
          <Image style={NavbarStyles.hamburger} source={hamburger} />
          <Text style={NavbarStyles.welcome}>
            Welcome, {name}!
          </Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Image style={NavbarStyles.scan} source={scanimg} />
          </TouchableOpacity>
        </View>
      }
      {page == 'uploadOptions' &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={NavbarStyles.close} source={closeimg} />
          </TouchableOpacity>
        </View>
      }
      {(page == 'upload' || page == 'select') &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={NavbarStyles.back} source={backimg} />
          </TouchableOpacity>
        </View>
      }
      {page == 'stats' &&
        <View style={NavbarStyles.topBar}>
          <Image style={NavbarStyles.hamburger} source={hamburger} />
          <Text style={NavbarStyles.welcome}>
            Your Profile
          </Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Image style={NavbarStyles.scan} source={scanimg} />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default Navbar;