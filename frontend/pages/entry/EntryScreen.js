import React, {Component} from 'react';
import {Text} from 'react-native';

//Authentication handler
import authHandler from '../authHandler';

//Redux imports
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setLoadingTrue,
  setLoadingFalse,
} from '../../redux/features/authentication/authenticationSlice';

//Navigations
import LoggedinNavigation from '../navigation/loggedInNavigation';
import GuestNavigation from '../navigation/guestNavigation';

import * as SpotifyConstants from '../../backend/spotify/SpotifyConstants';

class EntryScreen extends Component {
  state = {refreshToken: ''};

  componentDidUpdate(prevProps) {
    if (this.props.refreshToken !== prevProps.refreshToken && !this.props.accessToken) {
      this.tryAutoLogin();
    }
    if (this.props.accessToken !== prevProps.accessToken) {
      this.props.setLoadingFalse();
    }
  }

  tryAutoLogin = async () => {
      this.props.setLoadingTrue();
      const authenticationObject = authHandler;

      this.props.setAccessToken({
        accessToken: SpotifyConstants.ACCESS_TOKEN,
      });
      this.props.setRefreshToken({
        refreshToken: SpotifyConstants.ACCESS_TOKEN,
      });

      this.props.setLoadingFalse();
  };

  render() {
    const {accessToken, loading} = this.props.authentication;

    if (loading) {
      return <Text>Loading</Text>;
    }

    if (SpotifyConstants.ACCESS_TOKEN != null) {
      return <LoggedinNavigation />;
    }

    return <GuestNavigation />;
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    accessToken: state.authentication.accessToken,
    refreshToken: state.authentication.refreshToken
  };
};

const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
  setLoadingTrue,
  setLoadingFalse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryScreen);