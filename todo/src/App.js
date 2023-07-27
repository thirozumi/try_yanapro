import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState('')

  const onChangeInput = (e) => {
    setInputText(e.target.value)
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (inputText.trim() !== '') {
      setTodos([...todos, inputText])
      setInputText('')
    }
    localStorage.setItem('todos', JSON.stringify([...todos, inputText]))
  }

  const deleteTodo = (id) => {
    const _todos = todos.filter((todo, i) => { return i !== id })
    setTodos([..._todos])
    localStorage.setItem('todos', JSON.stringify(_todos))
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  return (
    <div className="App">
      <h1>Todo</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={inputText}
          onChange={onChangeInput}
          placeholder='Enter'
        />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo} <button onClick={() => deleteTodo(i)}>x</button></li>))}
      </ul>
    </div>
  );
}

export default App