import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])

  const onChangeInput = (e) => {
    setInputText(e.target.value)
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (inputText.trim() !== '') {
      setTodos([...todos, { title: inputText }])
      setInputText('')
    }
    localStorage.setItem('todos', JSON.stringify([...todos, { title: inputText }]))
  }

  const deleteTodo = (id) => {
    const _todos = todos.filter((todo, i) => { return i !== id })
    setTodos(_todos)
    localStorage.setItem('todos', JSON.stringify(_todos))
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  return (
    <div className="app">
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={inputText}
          onChange={onChangeInput}
          placeholder='Enter to Add'
        />
      </form>
      <ul className='todos'>
        {todos.map((todo, i) => (
          <li key={i}>
            <p>{todo.title}</p>
            <button onClick={() => deleteTodo(i)}>x</button>
          </li>))}
      </ul>
    </div>
  );
}

export default App