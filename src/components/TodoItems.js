import React from 'react';
import * as firebase from "firebase";
import { RaisedButton,  TextField,  ListItem } from 'material-ui';


class TodoItems extends React.Component {
    constructor(props) {
        super(props);
        this.EditDelete = this.EditDelete.bind(this)
        this.state = {
            isEditing:false,
            text:this.props.getTask[this.props.index]
        }
    }
    toggleState() {
        const {isEditing} = this.state;
        this.setState({
            isEditing:!isEditing
        })
    }
    EditDelete() {
        this.toggleState()
        this.props.deleteFunc(this.props.index)
    }
    DoneHandler(index) {
        if(this.state.text === this.props.getTask[this.props.index] || this.state.text === "") {
              alert('Please Update value or click Cancel')
        } else {
             firebase.database().ref().child(`todo/${this.props.keyValue[index]}`).update({text:this.state.text});
            this.toggleState()
        }

    }
    trueEditButton() {
            return (
            <ListItem key={this.props.index} >
               <TextField hintText="Task" defaultValue={this.props.getTask[this.props.index]}  onChange={(text) => this.setState({text:text.target.value})}/>
               <RaisedButton label="Done" primary={true} onClick={() => this.DoneHandler(this.props.index)}/>
               <RaisedButton label="cancel" style={{marginLeft:10}} primary={true} onClick={this.toggleState.bind(this)}/>
              <RaisedButton label="Delete" style={{marginLeft:10}} primary={true}   onClick={() => this.EditDelete()}/>
            </ListItem>
            )
      }

      falseEditButton() {
        const style = {
          marginLeft: '50%'
        }; 
            return ( <ListItem key={this.props.index} >
              <span style={{ marginRight: '90%' }}>{this.props.getTask[this.props.index]}</span>
              <RaisedButton label="Edit" primary={true} style={style} onClick={this.toggleState.bind(this)}/>
              <RaisedButton style={{marginLeft:10}} label="Delete" primary={true}  onClick={() => this.props.deleteFunc(this.props.index)}/>
            </ListItem>
            )
      }
    render() {
        const { isEditing } = this.state;
        return (
        <section>
            {
                isEditing ? this.trueEditButton() : this.falseEditButton()
            }
        </section>
        )
    }
}


export default TodoItems;