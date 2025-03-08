import Home from './components/Home/Home'
import './App.css'

const App = () => {
  return (
    <>
      <div className="p-4 bg-yellow-50 text-gray-800">
      <h1 className="text-2xl font-bold">Welcome to the Course Calendar Tracker App!</h1>
    </div>
      <div>
        <Home />
      </div>
    </>
  )
}

export default App;