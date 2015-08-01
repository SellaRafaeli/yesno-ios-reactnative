'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
} = React;


var userPosts = [
  {q_text: 'user question 1?', a_text: 'user answer 1'},
  {q_text: 'user question 2?', a_text: 'user answer 2'}
]

var basicPosts = [
  {q_text: 'basic question 1?', a_text: 'basic answer 1'},
  {q_text: 'basic question 2?', a_text: 'basic answer 2'} 
]

function getPosts(obj) {  
  console.log("getPosts");
//  debugger
  var opts = obj.opts || {};
  var res;
  if (opts.username) {

    //var postsRoute = 'http://localhost:9292/mobile/posts/?opts[page]=0&opts[type]=user_posts_type&opts[username]='+opts.username+'&mobile_token=9907e080-5d1b-400c-82c1-8d1bb9409b29'
    res = { posts: userPosts }
  } 
  else {
    res = {posts: basicPosts}
    //var postsRoute = 'http://localhost:9292/mobile/posts/?opts[page]=1&opts[type]=user_posts_type&opts[feed]=true&mobile_token=9907e080-5d1b-400c-82c1-8d1bb9409b29'  
  }
  
  //
  obj.handleNewPosts(res)
  //works: fetch(postsRoute).then(response => response.json()).then(json => obj.handleNewPosts(json));
  }

var TabBarExample = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    //debugger
    //getPosts(this);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var fakeArr = [];
    
    for (var i=0; i<30; i++) { 
      //console.log(i); 
      fakeArr.push({q_text: "some question?", a_text:"row and now his watch has ended. For Olly! Hooray hooray hooray and some more words. Thank you for the music! -- "+i}) }

    var arr = this.props.posts || fakeArr;
    
    return {
      ds: ds,
      selectedTab: 'greenTab',
      dataSource: ds.cloneWithRows(arr),
      notifCount: 0,
      presses: 0,
      posts: 'blaPosts'
    };


  },

  handleNewPosts: function(postsJson) {
    
    console.log("handleNewPosts");
    console.log(this.ds);     
    //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: this.state.ds.cloneWithRows(postsJson.posts)});
  },

  _newTab: function(opts) {
    this.props.navigator.push({
      title: 'Results',
      //component: SearchResults,
      component: TabBarExample,
      passProps: opts
    });
  },

  _renderRow: function(rowData) {
    return (
      <TouchableHighlight
        onPress={() => {
          //debugger
          
            console.log("pressed row view!");
    //        debugger
            var opts = {
              username: "sella-rafaeli"
            }
            this._newTab({posts: userPosts});  
          }}
      >
      <View>
      <Text style={styles.item_q}
        zonPress={() => {
          //debugger
            console.log("pressed row text!");
          }}
      >{rowData.q_text}</Text>
      <Text style={styles.item_a}>{rowData.a_text}</Text>
      </View>
      </TouchableHighlight>
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
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#F6F6F6',
  },
  tabText: {
    color: 'white',
    margin: 150,
  },
});

module.exports = TabBarExample;