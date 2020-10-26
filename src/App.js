import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      tasks:[], // id: duy nhất, name , status
      isDisplayForm:false
    }
  }
    componentWillMount(){// componentWillMount nó sẽ được thực hiện khi nhấn F5
      if(localStorage && localStorage.getItem('tasks')){
        var tasks= JSON.parse(localStorage.getItem('tasks'));
        this.setState({
          tasks:tasks
        })
      }
    }
  
  s4(){
    return Math.floor((1+Math.random())*0x1000).toString(16).substring(1); //Hàm Tạo ID RanDom
  }
  generateID(){
    return this.s4()+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()
    +'-'+this.s4()+'-'+this.s4()+this.s4()+this.s4()+this.s4()
  }

  onToggleForm=()=>{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm // toán tử 3 ngôi - khác với nhận định ban đầu 
                                              // lúc đầu là isDisplayForm = false ngược lại là true. 
    })
  }

  onCloseForm=()=>{
    this.setState({
      isDisplayForm:false,
    })
  }

  onSubmit=(data)=>{
    var {tasks} = this.state;
    data.id=this.generateID();
    tasks.push(data);
    this.setState({
      tasks:tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  render() {
    var {tasks, isDisplayForm }= this.state;// var tasks= this.state.tasks cú pháp JS ES6
    var elmTasksForm= isDisplayForm ? 
    <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} />
     : '';
    return (

  <div className="container">
    <div className="text-center">
      <h1>Quản Lý Công Việc</h1>
      <hr />
    </div>
    <div className="row">
      <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
           {/*Compontent TaskForm*/ }
            {elmTasksForm}
      </div>
      <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
          <span className="fa fa-plus mr-5"></span>Thêm Công Việc
        </button>
        {/* Component Control chứa các Component Search - Sort */}
        <div className="row mt-15">
          <Control /> 
        </div>

        <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/*Compontent TaskList*/}
              <TaskList  tasks={tasks}/>
          </div>
        </div>
      </div>
    </div>
  </div>

);
}
}

export default App;