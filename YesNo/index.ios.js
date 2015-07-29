/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchPage = require('./searchPage');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
//  TabBarIOS, NavigatorIOS
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  usernameInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

//var YesNoWelcome2 = React.createClass({
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'some-username',
      isLoading: false,
      message: ''
    };
  }


  onUsernameChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ username: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  onEnterPressed(event) {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to YesNo Native!
        </Text>
        <TextInput
      style={styles.usernameInput}
      value={this.state.username}
      onChange={this.onUsernameChanged.bind(this)}
      placeholder='enter username'/>
      
      <TouchableHighlight 
        style={styles.button}
        onPress={this.onEnterPressed.bind(this)}

        underlayColor='#99d9f4'
        >

      <Text style={styles.buttonText}>Enter</Text>
      </TouchableHighlight>
      
      </View>
    );
  }
};

// class YesNo extends React.Component {
  
//   render() {
//     return (
//       <React.NavigatorIOS
//         style={styles2.container}
//         initialRoute={{
//           title: 'YesNo Native World',
//           component: SearchPage,
//         }}/>
//       // <TabBarIOS>
//       //   <TabBarIOS.Item title="React Native" selected={true}>
//       //     <NavigatorIOS initialRoute={{ title: 'React Native' }} />
//       //   </TabBarIOS.Item>
//       // </TabBarIOS>
//     );
//   }
// }


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
//var styles = styles2;

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

AppRegistry.registerComponent('YesNo', () => Welcome);
