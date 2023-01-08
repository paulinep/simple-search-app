import React from 'react'
import './App.css'
import Todo from './Todo/Todo'
import Singin from './Signin/Signin'

function App() {
    const [currentUser, setCurrentUser] = React.useState(sessionStorage.getItem('SIMPLE-TOKEN'));

    console.log(currentUser)

    const getToken = ()=>{
        const token = sessionStorage.getItem('SIMPLE-TOKEN')
        setCurrentUser(token);
    }

    React.useEffect(() => {
        window.addEventListener('storage', getToken)
        return ()=>{
            window.removeEventListener('storage', getToken)
        }

    }, []);


    if (!currentUser) {
        return (
            <Singin/>
        )
    } else {
        return (
            <div className="App">
                <div className="root">
                    <Todo/>
                </div>
            </div>
        )
    }
}

export default App
