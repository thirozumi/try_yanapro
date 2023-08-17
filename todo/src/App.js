import Todo from './Todo'
import Timer from './Timer'
import './App.css'

function App() {
  return (
    <div className="app">
			<Timer
        initialMinute={25}
        initialSeconds={0} />
			<Todo />
    </div>
  );
}

export default App