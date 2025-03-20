import { useRef, useState, useMemo } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = `"!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~"`;

function App() {

  // REACT CONTROLLED FIELDS
  // Viene definito campo controllato un qualunque input che si basa su uno USE-STATE.
  // Per testarlo senza compilare sempre da zero, posso dare dei valori iniziali agli USE-STATE.
  const [fullName, setFullName] = useState('Camillo');
  const [username, setUsername] = useState('millerson');
  const [password, setPassword] = useState('abc1[]password');
  const [specialization, setSpecialization] = useState('Full stack');
  const [experienceYears, setExperienceYears] = useState(4);
  const [description, setDescription] = useState('Questa è la mia descrizione e sono uno studente del corso di Boolean. Aggiungo altri caratteri per ottenere il numero minimo di caratteri per la validazione del field.');

  const isUsernameValid = useMemo(() => {
    // NOTA: al posto di SPLIT posso usare l'operatore SPREAD per ottenere comunque l'array dei caratteri di una stringa. Adesempio [...username].
    const charsValid = username.split('').every(char =>
      letters.includes(char.toLowerCase()) ||
      numbers.includes(char.toLowerCase())
    );
    return charsValid && username.length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split('').some(char => letters.includes(char)) &&
      password.split('').some(char => numbers.includes(char)) &&
      password.split('').some(char => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return (
      description.trim().length >= 100 &&
      description.trim().length <= 1000
    );
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !experienceYears ||
      experienceYears <= 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
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
    });
  };

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
            {username.trim() && (
              <p
                style={{ color: isUsernameValid ? 'green' : 'red' }}
              >
                {isUsernameValid ? 'Username valido' : 'Deve rispettare X criteri'}
              </p>
            )}
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {password.trim() && (
              <p
                style={{ color: isPasswordValid ? 'green' : 'red' }}
              >
                {isPasswordValid ? 'Password valida' : 'Deve rispettare X criteri'}
              </p>
            )}
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
            {description.trim() && (
              <p
                style={{ color: isDescriptionValid ? 'green' : 'red' }}
              >
                {isDescriptionValid ? 'Descrizione valida' : 'Deve rispettare X criteri'}
              </p>
            )}
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
