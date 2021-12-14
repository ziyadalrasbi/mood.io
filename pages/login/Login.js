import React, {Component} from 'react';
import {View, Button} from 'react-native';

import {connect} from 'react-redux';

import authHandler from '../authHandler';

import {
  setAccessToken,
  setRefreshToken,
  setSigingIn,
} from '../../redux/features/authentication/authenticationSlice';
import LoginStyles from './LoginStyles';

class LoginScreen extends Component {
  state = {};

  onPressLogin = async () => {
    const authenticationObject = await authHandler.onLogin();
    this.props.setAccessToken({accessToken: authenticationObject.accessToken});
    this.props.setRefreshToken({
      refreshToken: authenticationObject.refreshToken,
    });
  };


  render() {
    return (
      <View style={LoginStyles.topContainer}>
        <Button onPress={this.onPressLogin} title="Press to login" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = {setAccessToken, setRefreshToken, setSigingIn};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);