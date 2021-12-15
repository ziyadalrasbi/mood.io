import * as AppAuth from 'expo-app-auth';
import { authorize } from 'expo-app-auth';
import * as AuthSession from 'expo-auth-session';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: '481af46969f2416e95e9196fa60d808d',
      redirectUrl: 'exp://192.168.0.65:19000',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ],
      usePKCE: false,
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://us-central1-mood-io-be1cc.cloudfunctions.net/api/user/authentication',
      },
    };
  }

  

  
  async onLogin() {
    try {
      console.log("hello")
      const result = await AppAuth.authAsync(this.spotifyAuthConfig);
      console.log("hello2")
      alert(JSON.stringify(result));
      return result;
    } catch (error) {
      console.log("idk3")
      console.log(JSON.stringify(error));
    } 
  }

  async refreshLogin(refreshToken) {
    const result = await AppAuth.refreshAsync(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }

}

const authHandler = new AuthenticationHandler();

export default authHandler;

