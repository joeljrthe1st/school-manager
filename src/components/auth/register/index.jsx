import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { addUser } from '../../../firebase/dbfunctions'; // Import the function to add user to Firestore
import './Register.css'; // Import the external CSS file

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState('teacher'); // Default role

    const roles = ['teacher', 'admin', 'parent'];

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                // Create user with email and password
                await doCreateUserWithEmailAndPassword(email, password);

                // Add user details to Firestore
                await addUser(firstname, lastname, email, role);

                // Redirect after successful registration
                navigate('/home');
            } catch (error) {
                setErrorMessage('Error creating user. Please try again.');
                console.error(error);
            } finally {
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            {/* <main className="register-container">
                <div className="register-card">
                    <div className="text-center mb-6">
                        <h3>Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                
                                required
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input
                                type="text"
                                
                                required
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
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
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Confirm Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {roles.map((r) => (
                                    <option key={r} value={r}>
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {errorMessage && (
                            <span className='error-message'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main> */}
            <main className="register-container">
  <div className="register-card">
    <div className="text-center mb-6">
      <h3>Create a New Account</h3>
    </div>
    <form onSubmit={onSubmit} className="register-form">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
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
          disabled={isRegistering}
          type="password"
          autoComplete='new-password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          disabled={isRegistering}
          type="password"
          autoComplete='off'
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && (
        <span className='error-message'>{errorMessage}</span>
      )}
      <button
        type="submit"
        className="register-button"
        disabled={isRegistering}
      >
        {isRegistering ? 'Signing Up...' : 'Sign Up'}
      </button>
      <div className="text-sm">
        Already have an account? {' '}
        <Link to={'/login'} className="font-bold">Continue</Link>
      </div>
    </form>
  </div>
</main>

        </>
    );
}

export default Register;
