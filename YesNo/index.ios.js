/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var LoginPage = require('./LoginPage');
var TabBarExample = require('./TabBarExample');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;



//var YesNoWelcome2 = React.createClass({
class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to YesNo Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
};

class YesNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  render() {
    return (
      <React.NavigatorIOS
        style={styles2.container}
        initialRoute={{
          title: 'welcome to yes.no',
          //component: LoginPage,
          component: TabBarExample,

        }}/>
    );
  }
}


var styles2 = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});
var styles = styles2;

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: 'darkblue',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('YesNo', () => YesNo);
