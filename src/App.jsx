import { useRef, useState } from "react";



function App() {

  // REACT CONTROLLED FIELDS
  // Viene definito campo controllato un qualunque input che si basa su uno USE-STATE.
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializatio.trim() ||
      !experienceYears.trim() ||
      experienceYears <= 0 ||
      !description.trim()
    ) {
      alert('Errore nella compilazione del form');
      return;
    }
    console.log('Submit effettuato:', {
      fullName,
      username,
      password,
      specialization,
      experienceYears,
      description,
    })
  }

  return (
    <>
      <div>
        <h1 className="debug">Web Developer Sign-up</h1>
        <form
          onSubmit={handleSubmit}
        >
          <label>
            <p>Full name</p>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </label>
          <label>
            <p>Username</p>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p>Specialization</p>
            <select
              value={specialization}
              onChange={e => setSpecialization(e.target.value)}
            >
              <option value="Full stack">Full stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </label>
          <label>
            <p>Experience years</p>
            <input
              type="number"
              value={experienceYears}
              onChange={e => setExperienceYears(e.target.value)}
            />
          </label>
          <label>
            <p>Description</p>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
