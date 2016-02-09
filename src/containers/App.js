import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TweetActions from '../actions/tweets';
import io from 'socket.io-client';
import DevTools from './DevTools';
import { List } from 'immutable-props';
import { createSelector } from 'reselect';
import {
  Header,
  ImmutableComponent,
  TweetList
} from '../components/index';

class App extends ImmutableComponent {
  socket;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.socket = io(`http://localhost:3000`);
    this.socket.on('tweet', (tweet) => {
      this.props.actions.addTweet(tweet);
    });
  }

  render() {
    const { tweets } = this.props;
    return (
      <div>
        <Header />
        <TweetList tweets={tweets} />
        <DevTools />
      </div>
    );
  }
}

App.propTypes = {
  tweets: List
};

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TweetActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);