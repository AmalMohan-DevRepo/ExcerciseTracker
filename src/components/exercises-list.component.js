import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {BiEditAlt} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';

const Exercise = props =>(
<tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+ props.exercise._id}><BiEditAlt/></Link> | <a href="#"  onClick={() => { props.deleteExercise(props.exercise._id) }}><RiDeleteBin6Line/></a>
    </td>
</tr>
);

export default class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises:[]};
    }
    componentDidMount(){
        axios.get(`http://localhost:${process.env.PORT || 5050}/exercises/`)
        .then(res => {
            this.setState({
                exercises: res.data
            });
        })
        .catch(err => console.log(err.message));
    }

    deleteExercise(id){
        axios.delete(`http://localhost:${process.env.PORT || 5050}/exercises/`+id)
        .then(res => console.log(res.data))
        .catch(err=> console.log(err.message));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        });
      }

    render(){
        return(
            <div className="container">
            
                <h3>Logged Exercises</h3>
                <table className="table text-light">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
                </table>
      
            </div>
        );
    };
};