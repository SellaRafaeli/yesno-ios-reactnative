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
  console.log("getPosts");
  var postsRoute = 'http://localhost:9292/mobile/posts/?opts[page]=1&opts[type]=user_posts_type&opts[feed]=true&mobile_token=9907e080-5d1b-400c-82c1-8d1bb9409b29'
  fetch(postsRoute).then(response => response.json()).then(json => obj.handleNewPosts(json));
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
    for (var i=0; i<30; i++) { console.log(i); arr.push("row and now his watch has ended. For Olly! Hooray hooray hooray and some more words. Thank you for the music! -- "+i) }
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(postsJson.posts)});
  },

  _renderRow: function(rowData) {
    return (
      <View
        onPress={() => {
          debugger
            console.log("pressed row view!");
          }}
      >
      <Text style={styles.item_q}
        onPress={() => {
          debugger
            console.log("pressed row text!");
          }}
      >{rowData.q_text}</Text>
      <Text style={styles.item_a}>{rowData.a_text}</Text>
      </View>
    )
  },
  _renderContent: function(color: string, pageText: string, num?: number) {

    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
       <ListView
      style={styles.listView}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => this._renderRow(rowData)}
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
          {this._renderContent('beige', 'Green Tab', this.state.presses)}
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
  listView: {
    // flex: 0.5,
    // padding: 40,
    marginTop: 45,
    // width: 400,

    //alignItems: 'right'
  },
  item_q: {
    color: 'blue'
  },
  item_a: {
    
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#F6F6F6',
  },
  tabText: {
    color: 'white',
    margin: 150,
  },
});

module.exports = TabBarExample;