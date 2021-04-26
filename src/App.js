import React, {Component} from 'react';
import './App.css';
import TodoItem from './components/todo-item';
import classNames from "classnames";
class App extends Component{  
  constructor() {
    super();
    this.state = {
      todoItems: [
        {
          id: 1, title: 'Đi chơi', isComplete: false
        },
        {
          id: 2, title: 'Xem phim', isComplete: false
        },
        {
          id: 3, title: 'Chạy bộ', isComplete: false
        },
        {
          id: 4, title: 'Cha lam gi', isComplete: false
        }
      ],
      selectedAll: false,
      filterStatus: 'all',
      newTodoItem:''
    };    
   
    this.onItemChange = this.onItemChange.bind(this);
    this.onSelectedAll = this.onSelectedAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);  
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  onItemChange(selectedItem) {
    return (event) => {
      selectedItem.isComplete = !selectedItem.isComplete;
      // console.log(selectedItem);
      let {todoItems} = this.state;
      let selectedAll = true;
      todoItems = todoItems.map((todoItem) => {        
        if (selectedItem.id === todoItem.id) {
          selectedAll = selectedAll && selectedItem.isComplete;
          return selectedItem;
        } 
        selectedAll = selectedAll && todoItem.isComplete;
        return todoItem;
      });
      
      this.setState({todoItems:todoItems, selectedAll: selectedAll});      
    };
  }
  onSelectedAll() {
    // console.log('All')
    let {todoItems, selectedAll} = this.state;
    selectedAll = !selectedAll;    
         
    todoItems = todoItems.map((todoItem) => {
      return { ...todoItem, isComplete: selectedAll };
    });
    this.setState({todoItems:todoItems, selectedAll: selectedAll}); 
  }
  onFilterChange(status) {
    return (event) => { 
      // console.log(status)
      this.setState({filterStatus: status});
    };
  }
  handleChange(event) {
    this.setState({newTodoItem: event.target.value});
  }
  handleSubmit(event) {
    if(event.key === 'Enter'){
      // console.log(event.target.value)
      let {todoItems} = this.state;
      todoItems.push({
        id: Math.max(...todoItems)+1,
        title: event.target.value,
        isComplete: false
      });
      this.setState({
        todoItems: todoItems,
        newTodoItem: ''
      });
    }
  }
  handleDelete() {
    let {todoItems} = this.state;
    todoItems = todoItems.filter((todoItem) => {return !todoItem.isComplete });
    this.setState({
      todoItems: todoItems
    });
  }
  render(){
    const {todoItems, selectedAll, filterStatus, newTodoItem} = this.state;
    const itemCount = todoItems.filter((todoItem) => !todoItem.isComplete).length;
    return (
      <div className="todoapp">
        <div className="header">        
          <input type="text" className="new-todo" value={newTodoItem} onChange={this.handleChange} onKeyDown= {this.handleSubmit}/>                        
        </div>
        <div className="main">
          <input className="toggle-all" type="checkbox" checked={selectedAll} onChange={this.onSelectedAll} />
            <label htmlFor="toggle-all"  onClick={this.onSelectedAll}/>
            <div className="todo-list">      
            {
              todoItems
              .filter((todoItem) => {
                return filterStatus==='all' ||
                (filterStatus==='active' && (!todoItem.isComplete)) ||
                (filterStatus==='complete' && todoItem.isComplete)
              })
              .map((todoItem, index) => <TodoItem title={todoItem.title} key={index} isComplete={todoItem.isComplete} 
              onItemChange={this.onItemChange(todoItem)} />)
            }                      
          </div>
        </div>
        <div className={classNames("footer", { hidden: todoItems.length===0 })}>
          <span className="todo-count">
            <strong>{itemCount}</strong>            
            <span> items</span>
            <span> left</span>
          </span>
          <ul className="filters">
            <li>
              <a href="#" className={classNames({ selected: filterStatus==='all' })} onClick={this.onFilterChange('all')}>All</a>
            </li>
            <li>
              <a href="#" className={classNames({ selected: filterStatus==='active' })} onClick={this.onFilterChange('active')}>Active</a>
            </li>
            <li>
              <a href="#" className={classNames({ selected: filterStatus==='complete' })} onClick={this.onFilterChange('complete')}>Completed</a>
            </li>
          </ul>
          <button className={classNames("clear-completed",{ hidden: todoItems.length-itemCount===0 })} onClick={this.handleDelete} >Clear completed</button>
        </div>        
      </div>      
    );
  }  
}

export default App;
