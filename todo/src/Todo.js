import React, { useState, useEffect } from 'react'
import './Todo.css'

function Todo() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])

  const onChangeInput = (e) => {
    setInputText(e.target.value)
  }

  const onSubmitForm = (e) => {
    e.preventDefault()

    const date = new Date()
    const now = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)

    if (inputText.trim() !== '') {
      setTodos([...todos, {
        title: inputText,
        timestamp: now
      }])
      setInputText('')
    }
    localStorage.setItem('todos', JSON.stringify([...todos, {
      title: inputText,
      timestamp: now
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
    <>
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
            <button
              className='todo-button'
              onClick={() => deleteTodo(i)}>╳</button>
          </li>))}
      </ul>
    </>
  )
}

export default Todo