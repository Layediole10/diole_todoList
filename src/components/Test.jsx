
import {React, useState, useEffect} from 'react';

const Test = () => {

    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [done, setDone] = useState(false);

    //  useEffect(() => {

    //     if(localStorage.getItem('todos') !== null){
    //         setTodos(JSON.parse(localStorage.getItem('todos')))
    //    }

    //    localStorage.setItem('todos', JSON.stringify(todos));
    // }) 
   

    const handleChange = (e) => {

        setInputValue(e.target.value);
    
    }

    const handleSubmit = (e) => { 

        e.preventDefault();

        const myTodo = {
            id: Math.floor(Math.random()*1000),
            value: inputValue,
            done: false
        }
        
        let newTodos = [...todos, myTodo];
        setTodos(newTodos);

        setInputValue("");
        
        // console.log(myTodo);
    }

    const handleDelete = (id) => {

        let myNewTodo = todos.filter((todo, i) => i != id);
        setTodos(myNewTodo);
        // console.log(myNewTodo);
        
    }

    const handleCheck = (todo, id) => {
        
        let elem = todos[id];
        elem.done = !todo.done;
        todos.splice(id, 1, elem);
        setTodos(todos)
        console.log(elem.done);
        

    }

    return (
        <div className='container'>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    
                    <div className="col-sm-5 mt-5">
                        <input type="text" className="form-control" onChange={handleChange} value={inputValue}></input>
                    </div>
                </div>
                
                
                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            <table className="table table-hover">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Todos</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>

                            {todos.map((todo, id) => {
                    return(
                                <tr key={id}>
                                    <th scope="row"><input type="checkbox" checked={todo.done} onChange={() =>  {handleCheck(todo, id)}}/></th>
                                    <td className={todo.done? "text-decoration-line-through": ""}>{todo.value}</td>
                                    <td>
                                        <i className="fa fa-pencil px-2" aria-hidden="true"></i>
                                        
                                        <i className="fa fa-trash" aria-hidden="true" onClick={() => handleDelete(id)}></i>
                                    </td>
                                </tr>
                            
                        )
                    })}
                    </tbody>

            </table>
            
        </div>
    );
};

export default Test;