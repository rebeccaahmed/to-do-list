// You code goes here!
/*use handlebars, {}, to write HTML in javascript*/ 
/* data gets passed down, events get passed up */

class TodoApp extends React.Component{ /*create a new ReactJS component*/
    constructor(props) { /*"constructor" is a function that gets started when you open your app*/
        super(props);
        this.state = {
            items: [{ /*container to hold all our todo items*/ 
                text: "Homework",
                done: false
            },
            {
                text: "Final Project",
                done: false            
            },
            { 
                text: "Have Fun!",
                done: false
            }],
            text: ''
        }
        this.updateText = this.updateText.bind(this);
        this.newTodo = this.newTodo.bind(this);
        this.itemDone = this.itemDone.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }
    updateText(evt){ /*updates the state.text with the updated text from the input element*/
        this.setState({text: evt.target.value});
    }
    newTodo(evt){ /*adds the new todo the the list of items stored on in the state*/
        evt.preventDefault(); 
        if (this.state.text.trim() !== '') {
            var items = this.state.items;
            items.push({
                text: this.state.text,
                done: false
            });
            this.setState({items: items, text: ''});
        }
    }
    itemDone(item){ /*collect the items from the state, loop through them and find the one where the text equals the item passed*/
        const items = this.state.items;
        for (var i = 0; i < items.length; i++){
            if (items[i].text == item.text){
                items[i].done = !items[i].done;
            }
        }
        this.setState({items: items});
    }
    clearCompleted(){
        const items = this.state.items;
        const notDone = [];
        for (var i = 0; i < items.length; i++){
            if (!items[i].done){
                notDone.push(items[i]);
            }
        }
        this.setState({items: notDone});
    }
    render(){
        return(
            <div>
                <form className="bg-primary text-white p-5" onSubmit={this.newTodo}>
                    <label>Add a New To-Do:</label>
                    <input className="form-control" value={this.state.text} type="text" onChange={this.updateText}/>
                </form>
                <h1 className="display-6 p-5">Your To-Do List</h1>
                <ul className="list-group list-group-flush bg-white text-dark pl-5"> 
                    {this.state.items.map((item) => {
                        return(
                            <TodoItem key={item.text} item={item} markDone={this.itemDone}/>
                        )
                    })}
                </ul>
                <button className="btn btn-warning m-5" onClick={this.clearCompleted}>Clear Completed</button>
            </div>
        );
    }
}

class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.done = this.done.bind(this);
    }
    done(){
        this.props.markDone(this.props.item);
    }
    render() { /*create a loop or mapping of the items, for each item render a new TodoItem*/
        return(
            <ul class="list-group list-group-flush">
                <div className="list-group-item">
                <li className={this.props.item.done ? 'text-strikethrough' : ''} onClick = {this.done}>{this.props.item.text}</li> 
                </div>
            </ul>
        );
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById('todoApp')
);

/*attempt at extra credit*/

const person = {
    name: "To Do Item",
    location: "TodoApp",
}

window.localStorage.setItem('user', JSON.stringify(person));

window.localStorage.getItem('user');
JSON.parse(window.localStorage.getItem('user'));