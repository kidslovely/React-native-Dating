import React from 'react';

import Router from './src/Router';

import { Font, AppLoading, Permissions } from "expo";
import { firebaseApp } from './src/components/FirebaseConfig';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          locationResult: 'Permission to access location was denied',
        });
      }
      this.askPermissionsAsync();
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }
    return (
     <Router/>
    );
  }
}
