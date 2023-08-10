import React, { useState, useEffect } from 'react'
import './App.css'
import dayjs from 'dayjs'

function App() {

  const [inputText, setInputText] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [todos, setTodos] = useState([])

  const onChangeInput = (e) => {
    setInputText(e.target.value)
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

    if (inputText.trim() !== '') {
      setTimestamp(now)
      setTodos([...todos, {
        title: inputText,
        createdAt: now
      }])
      setInputText('')
    }

    localStorage.setItem('todos', JSON.stringify([...todos, {
      title: inputText,
      createdAt: now
    }]))
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
          <li key={i}>
            <div>title: {todo.title}</div>
            <div>createdAt: {todo.createdAt}</div>
            <button onClick={() => deleteTodo(i)}>x</button>
          </li>))}
      </ul>
    </div>
  );
}

export default App