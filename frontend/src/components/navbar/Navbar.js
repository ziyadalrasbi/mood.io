import hamburger from '../../../assets/icons/home/hamburger.png';
import closeimg from '../../../assets/icons/home/close.png';
import aboutimg from '../../../assets/icons/home/about.png';
import backimg from '../../../assets/icons/upload/back.png';
import NavbarStyles from './NavbarStyles';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

function Navbar({ navigation, name, page }) {

  return (
    <View>
      {page == 'home' &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image style={NavbarStyles.hamburger} source={hamburger} />
          </TouchableOpacity>
          <Text style={NavbarStyles.welcome}>
            Welcome, {name}!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Image style={NavbarStyles.about} source={aboutimg} />
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
      {(page == 'upload' || page == 'select' || page == 'contact') &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={NavbarStyles.back} source={backimg} />
          </TouchableOpacity>
        </View>
      }
      {page == 'stats' &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={NavbarStyles.back} source={backimg} />
          </TouchableOpacity>
          <Text style={NavbarStyles.welcome}>
            Your Profile
          </Text>
          <View style={{ width: 30, height: 30 }} />
        </View>
      }
      {page == 'recommendations' &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={NavbarStyles.back} source={backimg} />
          </TouchableOpacity>
          <Text style={NavbarStyles.welcome}>
            Your Recommendations
          </Text>
          <View style={{ width: 30, height: 30 }} />
        </View>
      }
      {page == 'habits' &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={NavbarStyles.back} source={backimg} />
          </TouchableOpacity>
          {/* <Text style={NavbarStyles.welcome}>
            Your Listening Habits
          </Text> */}
          <View style={{ width: 30, height: 30 }} />
        </View>
      }
      {page == 'results' &&
        <View style={NavbarStyles.topBar}>
          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}>
            <Image style={NavbarStyles.close} source={closeimg} />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default Navbar;