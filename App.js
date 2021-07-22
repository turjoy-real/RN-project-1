import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import employeeReducer from './store/reducer/employees';


const rootReducer = combineReducers({
  employees: employeeReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>

  );
}


