import React, { Component } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import LoggedNavbar from '../layout/LoggedNavbar';

const MESSAGE_LIMIT = 40;
const HEARTBEAT_INTERVAL = 1000;

class Channel extends Component {
  constructor(props) {
    super(props);
    
    let sender = Cookie.get('name')
    console.log(sender)
    if (sender == null) {
      props.history.push('/'); 
    }
    this.state = {
      name: sender, 
      channel: "",
      messages: [],
      heartbeat: null,
      heartbeat_timestamp: new Date(),
      heartbeat_lock: false,
      form_message: ''
    }

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);

    this.doHeartbeat = this.doHeartbeat.bind(this);
  }
  componentDidMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search); 
    const value = params.get("name");
    this.setState({
      channel: value
    })
    function fetch_messages(self) {
      axios.get(`http://localhost:5000/api/messages?channel=${value}&limit=${MESSAGE_LIMIT}`).then(res => {
        let messages = res.data.data;
        let heartbeat_id = setInterval(self.doHeartbeat, HEARTBEAT_INTERVAL);
        self.setState({messages : messages, heartbeat : heartbeat_id, heartbeat_timestamp: new Date()});
      }).catch(err => {
        if (err.response.status === 404) {
          axios.post("http://localhost:5000/api/channels", {
            name: value
          }).then(res => {
            fetch_messages(self);    
          });
        }
      });
    }

    fetch_messages(this); 
  }

  doHeartbeat() {
    if (this.state.heartbeat_lock) {
      return;
    }

    this.setState({ heartbeat_lock: true });

    axios.get(`http://localhost:5000/api/messages?channel=${this.state.channel}&after=${this.state.heartbeat_timestamp.toISOString()}`).then(res => {
      let new_messages = res.data.data;
      let messages = new_messages.length > 0 ? new_messages.concat(this.state.messages).slice(0, MESSAGE_LIMIT) : this.state.messages; 
      this.setState({ messages : messages, heartbeat_timestamp: new Date(), heartbeat_lock: false });
    });
  }

  handleMessageChange(event) {
    this.setState({ form_message : event.target.value });
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    let message = this.state.form_message;
    if (message == null || message === '') {
      return;
    }

    axios.post("http://localhost:5000/api/messages", {
      sender: this.state.name,
      content: message,
      channel: this.state.channel 
    }).then(res => {
      this.doHeartbeat();
      document.getElementById("message-form").reset();
    });
  }

  render() {
    if (this.state.heartbeat == null) {
      return (
        <>
        <div className="container separation-large">
          <div className="row separation">
            <div className="twelve columns">
              <h2>Loading. Please be patient.</h2>
            </div>
          </div>
        </div>
        </>
      );
    }
    
    return (
      <>
      <LoggedNavbar />
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2>Welcome {this.state.name} </h2>
            <h5>You are currently in the discussion forum for the course {this.state.channel}, see what your course mates have to say</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            {this.state.messages.length > 0 ? this.state.messages.map(message => 
              <p key={message._id}><b>{message.sender}:</b> {message.content}</p>
            ) : <p>No messages in the channel yet.</p>}
          </div>
          <div className="col s6">
            <form onSubmit={this.handleMessageSubmit} id="message-form">
              <label>Message: </label>
              <input type="text" className="u-full-width" onChange={this.handleMessageChange}/><br/>
              <button class="btn waves-effect waves-light red" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Channel;
