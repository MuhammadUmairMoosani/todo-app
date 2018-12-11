import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase"
import { RaisedButton, AppBar, TextField, List } from 'material-ui';
import TodoItems from './components/TodoItems'

// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
class App extends Component {
  constructor(props) {
    super(props);
    this.deteleData = this.deteleData.bind(this)
    this.state = {
      todo: '',
      task: [],
      keyss: [],
    }
  }
  componentWillMount() {
    const dbRef = firebase.database().ref().child('todo');
    dbRef.on('value', snap => {
      let temTask = [];
      let keysGet = [];
     
      let value = snap.val()
      for (let i in value) {
        temTask.push(value[i].text);
        keysGet.push(i);
      }
      this.setState({ task: temTask, keyss: keysGet});
    })
  }
  saveInFirebase() {
    let getValue = this.state.todo;
    let database = firebase.database();
    let ref = database.ref('todo');
    if (getValue === '') {
      alert('Please enter task')
    } else {
      ref.push({ text: getValue });
      this.setState({ todo: '' })

    }


  }
  deteleData(index) {
    firebase.database().ref().child(`todo/${this.state.keyss[index]}`).remove();
  }




 
  render() {
    
    return (
      <section className="App">
           <AppBar title="TODO" showMenuIconButton={false} />
      <TextField hintText="Task" value={this.state.todo} onChange={(text) => this.setState({ todo: text.target.value })} />
      <RaisedButton label="Add"   primary={true}  onClick={this.saveInFirebase.bind(this)} />
      <List style={{ width: 800, margin: '0 auto' }}>{this.state.task.map((value, index) => {
        return (
      <TodoItems 
      key={index}
      getTask={this.state.task}
      index={index}
      deleteFunc={this.deteleData}
      keyValue={this.state.keyss}
      />)
          })}</List>
      </section>
    );
  }
}

export default App;
