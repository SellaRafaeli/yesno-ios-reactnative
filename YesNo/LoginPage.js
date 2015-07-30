'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');
var TabBarExample = require('./TabBarExample');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
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
  searchInput: {
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


function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'sella',
      isLoading: false,
      message: ''
    };
  }
  _handleResponse(response) {
    this.props.navigator.push({
      title: 'Results',
      //component: SearchResults,
      component: TabBarExample,
      passProps: {listings: response.listings}
    });
  }
  _executeQuery(query) {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error => 
       this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
     }));
  }
   
  onSignInPressed() {
    if (this.state.username == 'sella') {
        this.props.navigator.push({
        title: 'TabBar',
        //component: SearchResults,
        component: TabBarExample,
        passProps: {listings: []}
      });
    }
    else {
      this.setState({errMsg: 'Bad username, try "sella"'});
    }
    return;
    var query = urlForQueryAndPage('place_name', this.state.username, 1);
    this._executeQuery(query);
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ username: event.nativeEvent.text });
    console.log(this.state.username);
  }

  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ',' + location.coords.longitude;
        this.setState({ username: search });
        var query = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        });
      });
  }
  
  render() {
    var spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS
      hidden='true'
      size='large'/> ) :
    ( <View/>);

    console.log('SearchPage.render');
    return (
      <View style={styles.container}>
      <Text style={styles.description}>
      Enter your username.
      </Text>
      <Text style={styles.description}>
      {this.state.errMsg || ''}
      </Text>
      <View style={styles.flowRight}>

      <TextInput
      style={styles.searchInput}
      value={this.state.username}
      onChange={this.onSearchTextChanged.bind(this)}
      placeholder='Search via name or 202postcode'/>
      <TouchableHighlight 
        style={styles.button}
        onPress={this.onSignInPressed.bind(this)}

        underlayColor='#99d9f4'
        >

      <Text style={styles.buttonText}>Enter</Text>
      </TouchableHighlight>
      </View>
      
      
      { /* <TouchableHighlight style={styles.button}      
      underlayColor='#99d9f4'
      onPress={this.onLocationPressed.bind(this)}
      >
      <Text style={styles.buttonText}>Location2</Text>
      </TouchableHighlight> */ }
      <Image source={require('image!house')} style={styles.image}/>
      {spinner}
      <Text style={styles.description}>
      
      </Text>
      <Text style={styles.description}>{this.state.message}</Text>

      </View>
      );
}
}

module.exports = SearchPage;