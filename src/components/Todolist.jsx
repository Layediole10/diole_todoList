import React, { Component } from 'react'

class Todolist extends Component {

    constructor(props){
        super(props)
        this.state = {

            inputValue: "",
            arrTodo: [],
            editing: false,
            index: -1
        }
    }
    
    componentDidMount(){

        if(localStorage.getItem('newArrTodo') !== null){
             this.setState({arrTodo: JSON.parse(localStorage.getItem('newArrTodo'))})
        }
    }

    componentDidUpdate(){

        localStorage.setItem('newArrTodo', JSON.stringify(this.state.arrTodo));
    }

    // methode de recuperation de valeur dans l'input
    handleChange(e, index){
        // pour modifier l'object inputValue on utilise la methode "this.setState"
        this.setState({inputValue: e.target.value});

        // console.log(e.target.value, index)
        
        
    }

   
    // methode d'ajout d'elements dans la liste 
    handleSubmit(e){

        const {arrTodo, inputValue, i, editing} = this.state;

        // utilisons la methode "preventDefault" pour que le champs ne se vide pas au clic du bouton
        e.preventDefault();

        // editing element
        if (editing) {
            
            let item = arrTodo[i];
            item.value = inputValue;
            arrTodo.splice(i, 1, item);
            this.setState({arrTodo: arrTodo, inputValue: "",
            editing: false, i: -1});
        } else {

            // Add element
            const myTodo = {
                // id: Math.floor(Math.random()*1000),
                value: inputValue,
                done: false,
            }
  
            // j'utilise le "spread operator" pour copier le tableau arrTodo avant d'ajouter la valeur de l'input
            let newArrTodo = [...arrTodo, myTodo];
            console.log(arrTodo);
    
            // vider l'input à chaque fois que l'élément est ajouté dans le tableau et affecter "inputValue" au "value" de l'input dans le rendu
            this.setState({arrTodo: newArrTodo, inputValue: ""});
    
        }

       
     
    }

    // methode de suppression d'un element
    handleClickDelete(index){
        const { arrTodo} = this.state;
        // on renvoie les elements dont les index sont differents de l'index de l'element cliqué

           let newArray = arrTodo.filter((todo, i) => i != index);
            this.setState({
                arrTodo: newArray
            })
        
    }

    // methode pour editer un element todo
    // handleEditing(item){

    //     this.setState({editing: true, inputValue: item.myTodo})
    //     console.log('item editing', this.state.editing);
    // }

    

    handleCheck(item, index){
        const {arrTodo} = this.state;
        let elem = arrTodo[index];
        elem.done = !item.done;
        arrTodo.splice(index, 1, elem);
        this.setState({arrTodo: arrTodo})
        console.log(elem.done);

    }


  render() {
    // on fait la destructuration pour ne pas repeter a chaque fois "this.state" dans le rendu
    const {inputValue, arrTodo} = this.state;

    return (
      <div className='w-50'>
            <h1 className="bg bg-primary text-light text-center bordered">
                Todo List
            </h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
                
                <div className="input-group">
 
                        <input type="text" className="form-control" onChange={this.handleChange.bind(this)} value={inputValue} ></input>
                        
                    <button type="submit" className={this.state.editing?"btn btn-success": "btn btn-primary"}>

                    {this.state.editing?'Update': 'Add'}
                    </button>
                </div>
                
                
            </form>
            

            {
                <table className="table table-dark table-hover my-3">
                    
                     <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Todos</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                        <tbody>

                            {arrTodo.map((item, index) => {
                    return(
                                <tr key={index}>
                                    <th scope="row"><input type="checkbox" checked={item.done}  onChange={() =>{this.handleCheck(item, index)}}/></th>

                                    <td className={item.done? "text-decoration-line-through": ""}>{item.value}</td>
                                    <td>
                                        <i className="fa fa-pencil px-2" aria-hidden="true" onClick={() => {

                                            this.setState({editing: true, inputValue: item.value,
                                            i: index})
                                        }}
                                        
                                        
                                        ></i>
                                        
                                        <i className="fa fa-trash" aria-hidden="true" onClick={() =>{
                                            this.handleClickDelete(index)
                                        }}></i>
                                    </td>
                                </tr>
                            
                        )
                    })}
                    </tbody>
                    
                </table>
            }
            
      </div>

    )
  }
}
export default Todolist
