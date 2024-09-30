import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import './Login.css';  // Import the external CSS file

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            {/* <main className="login-container">
                <div className="login-card">
                    <div className="text-center">
                        <div className="mt-2">
                            <h1>Al-Tech School Manager</h1>
                           
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <span className='error-message'>{errorMessage}</span>
                        )}

                        <button type="submit" disabled={isSigningIn}>
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p>Don't have an account? <Link to={'/register'} className="font-bold">Sign up</Link></p>
                </div>
            </main> */}
            <main className="login-container">
  <div className="login-card">
    <div className="text-center">
      <div className="mt-2">
        <h1>Al-Tech School Manager</h1>
      </div>
    </div>
    <form onSubmit={onSubmit} className="login-form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          autoComplete='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          autoComplete='current-password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMessage && (
        <span className='error-message'>{errorMessage}</span>
      )}

      <button type="submit" className="login-button" disabled={isSigningIn}>
        {isSigningIn ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
    <p className="signup-link">Don't have an account? <Link to={'/register'} className="font-bold">Sign up</Link></p>
  </div>
</main>

        </div>
    );
};

export default Login;
