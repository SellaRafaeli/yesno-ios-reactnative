'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  TabBarIOS,
  Text,
  View,
} = React;

function getPosts(obj) {  
  console.log("getPosts")
  fetch('http://localhost:9292/ping').then(response => obj.handleNewPosts(response));
  // .then(response => response.json())
  // .then(json => obj.handleNewPosts(json.response));
  }


var TabBarExample = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var arr = [];
    for (var i=0; i<100; i++) { console.log(i); arr.push("row "+i) }
    return {
      selectedTab: 'redTab',
      dataSource: ds.cloneWithRows(arr),
      notifCount: 0,
      presses: 0,
      posts: 'blaPosts'
    };
  },

  handleNewPosts: function(postsJson) {
    console.log("handleNewPosts");    
    this.setState({posts: postsJson})
  },

  _renderContent: function(color: string, pageText: string, num?: number) {

    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
       <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
      { /*  <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{this.state.posts}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text> */ }
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS tintColor="white" barTintColor="darkslateblue">

        <TabBarIOS.Item
          title="My Profile"
          systemIcon="contacts"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
              notifCount: this.state.notifCount + 1
            });
          }}>
          {this._renderContent('#414A8C', 'My Profile')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="most-viewed"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="bookmarks"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            getPosts(this);
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 150,
  },
});

module.exports = TabBarExample;