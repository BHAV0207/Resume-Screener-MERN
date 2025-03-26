import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </Router>

  )
}

export default App
