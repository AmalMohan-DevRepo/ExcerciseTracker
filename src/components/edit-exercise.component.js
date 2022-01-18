import React, { Component }  from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

export default class EditExercise extends Component{

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
    }

    componentDidMount(){
      const path = window.location.pathname;
      axios.get(`http://localhost:${process.env.PORT || 5050}/exercises/`+path.substring(5))
      .then(res =>{
            this.setState({
                username: res.data.username,
                description:res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            });
      })
      .catch(err => console.log(err.message));


      axios.get(`http://localhost:${process.env.PORT || 5050}/users/`)
      .then( res => {
          if(res.data.length > 0){
            this.setState({
                users: res.data.map(user => user.username),
            });
          }
      });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username : this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date

        }

        axios.post(`http://localhost:${process.env.PORT || 5050}/exercises/update`+ (window.location.pathname).substring(5),exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message));
       window.location = '/';
    }

    render(){
        return(
            <div className="container">
            <h3>Update Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group m-1"> 
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                            return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className="form-group m-1"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group m-1">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group m-1">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group mt-4 ml-1">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    };
};