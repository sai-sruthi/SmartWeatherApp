import React from 'react';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import searchReducer from '../reducers/search';
import WeatherApp from './weatherApp';
import { ScrollView } from 'react-native';

const logger = createLogger();
const store = createStore(searchReducer, applyMiddleware(thunk, promise, logger));

const Main = ({ navigation }) =>
  (<Provider store={store}>
    <ScrollView>
      <WeatherApp
        navigation={navigation} />    
    </ScrollView>
  </Provider>);

export default Main;
