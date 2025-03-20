import { useRef, useState, useMemo, useEffect } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = `"!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~"`;

function App() {

  // REACT CONTROLLED FIELDS
  /* Viene definito campo controllato un qualunque input che si basa su uno USE-STATE.
  Per testarlo senza compilare sempre da zero, posso dare dei valori iniziali agli USE-STATE.
  Mantengo i CONTROLLED FIELDS solo nei casi in cui mi serva un check in tempo reale e sulla UI.
  Altrimenti uso USE-REF di REACT che prende i valori direttamente dal DOM senza eseguire il render del componente a ogni cambiamento, ma solo in specifici eventi (esempio il SUBMIT).*/
  const [username, setUsername] = useState('millerson');
  const [password, setPassword] = useState('abc1[]password');
  const [description, setDescription] = useState('Questa è la mia descrizione e sono uno studente del corso di Boolean. Aggiungo altri caratteri per ottenere il numero minimo di caratteri per la validazione del field.');
  // const [fullName, setFullName] = useState('Camillo');
  // const [specialization, setSpecialization] = useState('Full stack');
  // const [experienceYears, setExperienceYears] = useState(4);

  // NOT CONTROLLED FIELDS (useRef)
  /*Si usa USE-REF di REACT quando non c'è bisogno di verificare dei dati in tempo reale, ma ottenerli solo quando avviene un evento specifico, ad esempio il SUBMIT di un FORM che avviene solo al click del BUTTON. Questo rende efficiente il codice perchè non è più necessario che REACT esegua il RENDER del COMPONENT ogni volta, ma solo quando si scatena l'evento.*/
  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceYearsRef = useRef();

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

    // VALORI NON CONTROLLATI (useRef)
    const fullName = fullNameRef.current.value;
    const specialization = specializationRef.current.value;
    const experienceYears = experienceYearsRef.current.value;

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

  useEffect(() => {
    fullNameRef.current.focus();
  }, [])

  const resetForm = (e) => {
    e.preventDefault();

    // RESET CONTROLLED FIELDS
    setUsername('');
    setPassword('');
    setDescription('');

    // RESET UNCONTROLLED FIELDS
    // In questo caso non resetto lo USE-STATE (che non c'è) ma direttamente il valore di quell'elemento sul DOM.
    fullNameRef.current.value = '';
    specializationRef.current.value = '';
    experienceYearsRef.current.value = '';

    fullNameRef.current.focus();
  }

  const formRef = useRef();

  return (
    <>
      <div>
        <h1 className="debug">Web Developer Sign-up</h1>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label>
            <p>Full name</p>
            <input
              type="text"
              // value={fullName}
              // onChange={e => setFullName(e.target.value)}
              ref={fullNameRef}
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
              // value={specialization}
              // onChange={e => setSpecialization(e.target.value)}
              ref={specializationRef}
            >
              <option value="">Seleziona</option>
              <option value="Full stack">Full stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </label>
          <label>
            <p>Experience years</p>
            <input
              type="number"
              // value={experienceYears}
              // onChange={e => setExperienceYears(e.target.value)}
              ref={experienceYearsRef}
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
          <button onClick={resetForm}>Reset fields</button>
        </form>
      </div>
      <footer style={{ height: '100vh' }}></footer>
      <button
        id='scrolltop-arrow'
        onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}
      >
        Torna su
      </button>
    </>
  )
}

export default App
