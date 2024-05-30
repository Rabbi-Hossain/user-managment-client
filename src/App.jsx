
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  const handleAddUser = e=>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name,email}
    console.log(user);

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers:{
        'Content-Type': "application/json"
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const newData = [...users, data]
      setUsers(newData)
      form.reset()
    })

    
  }

  return (

    <>
      <h1>User Management client:{users.length}</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="add" />
      </form>


      {
        users.map(user=><p key={user.id}>{user.id}: {user.name} {user.email}</p>)
      }
    </>
  )
}

export default App
