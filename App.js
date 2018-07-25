import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Backendless from 'backendless';

const APP_ID = '35C71CA5-2C8A-6F40-FFAD-4DAA61E67D00';
const API_KEY = 'E2D2E4E9-284E-8F9D-FFF4-8323A708D600';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

const initialState = {
  loading: true,
  message: '',
  error  : null
}

export default class App extends React.Component {
  state = initialState

  componentDidMount() {
    Backendless.Data.of('TestTable').save({ foo: 'bar' })
     .then(obj => {
       const message = 'A data object has been saved in Backendless. Check \'TestTable\' in Backendless Console.' +
         `ObjectId = ${obj.objectId}`

       this.setState({ message, loading: false })
     })
     .catch(error => this.setState({ error: `Got an error - ${error}`, loading: false }))
  }

  render() {
    const { error, loading, message } = this.state

    return (
      <View style={styles.container}>
        <Text>{ loading ? 'Loading...' : message || error } </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
                