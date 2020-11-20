import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Instructions from './views/Instructions'
import Register from './views/student/Register'
import Login from './views/student/Login'
import RetrievePassword from './views/student/RetrievePassword'
import ChangePassword from './views/student/ChangePassword'
import Education from './views/student/Education'
import PersonalInfo from './views/student/PersonalInfo'
import UploadDocuments from './views/student/UploadDocuments'
import Summary from './views/student/Summary'
import Status from './views/student/Status'
import AdminLogin from './views/admin/Login'
import AdminRetrievePassword from './views/admin/RetrievePassword'
import AdminChangePassword from './views/admin/ChangePassword'


import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import navReducer from './store/reducer/nav'
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  navToggle:navReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <Instructions/>
            </Route>
            <Route exact path='/student'>
              <Register/>
            </Route>
            <Route exact path='/student/login'>
              <Login/>
            </Route>
            <Route exact path='/student/retrieve-password'>
              <RetrievePassword/>
            </Route>
            <Route exact path='/student/change-password'>
              <ChangePassword/>
            </Route>
            <Route exact path='/student/personal-info'>
              <PersonalInfo/>
            </Route>
            <Route exact path='/student/education'>
              <Education/>
            </Route>
            <Route exact path='/student/upload-documents'>
              <UploadDocuments/>
            </Route>
            <Route exact path='/student/summary'>
              <Summary/>
            </Route>
            <Route exact path='/student/status'>
              <Status/>
            </Route>
            <Route exact path='/admin'>
              <AdminLogin/>
            </Route>
            <Route exact path='/admin/retrieve-password'>
              <AdminRetrievePassword/>
            </Route>
            <Route exact path='/admin/change-password'>
              <AdminChangePassword/>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
