import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';


function App() {
  const [users, setUsers] = useState([]) /* set users */

  /* load data from server side */
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const user = { name, email }

    /* send data to server side */
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      /* display new user on UI without reloading */
      .then(data => {
        // console.log(data)
        const newUser = [...users, data]
        setUsers(newUser)
      })
      .catch(err => console.error(err))

    form.reset()
    console.log(user)
  }


  return (
    <div className="App">
      <h2>Total User: {users.length}</h2>
      <div>
        {
          users.map(user => <p
            key={user.id}>
            {user.name}: {user.email}
          </p>)
        }
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='your name' /> <br /><br />
        <input type="email" name='email' placeholder='your email' /> <br /><br />
        <button type='submit'>Add user</button>
      </form>
    </div>
  );
}

export default App;
