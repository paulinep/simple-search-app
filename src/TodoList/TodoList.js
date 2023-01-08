import React from 'react';
import './TodoList.css'
import { Checkbox, FormControlLabel } from '@material-ui/core'

export default function  TodoList(props) {
    const { todoList, onTodoChange} = props
    return (
        <div className="Todo_list">
            {todoList.map((todo)=>{
                return (
                    <div key={todo.id}  className="Todo_list_item">
                        <FormControlLabel
                            control={<Checkbox
                                color="primary"
                                onChange={()=>onTodoChange(todo)}
                                checked={!!todo.done}
                            />}
                            label={todo.name}
                            />
                    </div>
                )
            })}
        </div>

    )
}
