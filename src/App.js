import React, {useState} from 'react'
import Login from './Components/Login'
import Info from './Components/Info'
import axios from 'axios';

function App() {
  const [isLoggedIn, setLogged] = useState(false)
  const [userInfo, setInfo] = useState({
    email: '',
    password: ''
  })
  const [projects, setProjects] = useState([]);
  

  function handleLoginSubmit(res){
    setLogged(res);
    const promise = axios.get('https://private-052d6-testapi4528.apiary-mock.com/info')
    .then(function(response) {
      return response.data;
    })
    .then(function(data){
      setProjects(result => [...result, data]);
      return data;
    })
    console.log(projects)
  }

  function handleUserInfo(info){
    setInfo(preValue => {
      return {
        email: info.email,
        password: info.password
      }
    });
  } 

  return (
    <div>
        {isLoggedIn ? 
          <Info path="/info" userInfo={userInfo} projectsInfo={projects}/>  
          :
          <Login handleUser={handleUserInfo} handleLogin={handleLoginSubmit}/>
        }
      </div>
  );
}

export default App;
