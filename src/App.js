import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Messages from "./components/messages";
import DirectMessages from "./components/directMessages";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="main-container">
        <Navbar />
        <Switch>
          <Route path="/messages/:id" component={Messages} />
          <Route path="/direct_messages/:channelId/:userId/:name" component={DirectMessages} />
        </Switch>
      </div>
    );
  }
}

export default App;
