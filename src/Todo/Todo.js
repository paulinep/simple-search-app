import React from 'react';
import throttle from '../services/throttle'
import './Todo.css'
import priceCheck from '../services/priceCheck'
import TodoList from '../TodoList/TodoList'
import { Button, TextField } from '@material-ui/core'

export default function  Todo() {

    const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem('simple-todo-list') || '{ "todoList":[] }'))
    const [query, setQuery] = React.useState('')

    console.log(todoList, query)
    const getTodoList = ()=>{
        const todo = JSON.parse(localStorage.getItem('simple-todo-list') || '{ "todoList":[] }')
        setTodoList(todo);
    }

    React.useEffect(() => {
        window.addEventListener('localStorage', getTodoList)
        return ()=>{
            window.removeEventListener('localStorage', getTodoList)
        }

    }, []);
   const onTodoChange = (item)=> {
       let newTodoList = [...todoList.todoList]
       const newItemIndex = newTodoList.findIndex(task=> item.id === task.id)
       if (newItemIndex > -1) {
           newTodoList[newItemIndex].done = !item.done
           localStorage.setItem('simple-todo-list', JSON.stringify({todoList: newTodoList}))
           window.dispatchEvent(new Event('localStorage'))
       }

   }

   const onQueryChange = (event)=>{
       setQuery(event.target.value)
   }

    const onTodoAdd = React.useCallback(()=> {
        let newTodoList = [...todoList.todoList]
        const newItem = { id: newTodoList.length + 1 , done: false, name: query }
        newTodoList.push(newItem)
        localStorage.setItem('simple-todo-list', JSON.stringify({todoList: newTodoList}))
        window.dispatchEvent(new Event('localStorage'))
    }, [query])

    return (
        <>
            <div className="Todo">
                <TextField variant="outlined" className="Todo_input" name="query" onChange={onQueryChange}/>
                <Button color="primary" onClick={onTodoAdd}>Add todo</Button>
            </div>
            {/*<div>*/}
            {/*    {priceCheck(['eggs', 'milk', 'cheese'],*/}
            {/*         [2.89, 3.29, 5.79],*/}
            {/*        ['eggs', 'eggs', 'cheese', 'milk'],*/}
            {/*         [2.89, 2.99, 5.97, 3.29]*/}
            {/*        )}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {priceCheck(['rice', 'sugar', 'wheat', 'cheese'],*/}
            {/*        [16.89, 56.92, 20.89, 345.99],*/}
            {/*        ['rice', 'cheese'],*/}
            {/*        [18.99, 400.89]*/}

            {/*    )}*/}
            {/*</div>*/}
            {todoList && (
                <TodoList
                    todoList={todoList.todoList}
                    onTodoChange={onTodoChange}
                />
            )}
        </>



    )
}
