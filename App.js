import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {store} from './redux/store/store';

import EntryScreen from './pages/entry/EntryScreen';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EntryScreen />
      </Provider>
    );
  }
}
export default App;