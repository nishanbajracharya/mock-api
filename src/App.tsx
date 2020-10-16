import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './services/firebase';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, loading, error] = useAuthState(auth);

  function login() {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!user ? <>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="email" value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={login}>Sign in</button>
      </> : <button onClick={logout}>Log out</button>
      }
    </div>
  );
}

export default App;
