import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LoginRegister = () => {
    const { login, register } = useContext(AppContext);
    const [mode, setMode] = useState('login'); 
    
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // --- NEW STATE FOR ROLE ---
    const [role, setRole] = useState('student'); // Default to 'student'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        let response;
        if (mode === 'login') {
            if (!email || !password) return setError('Please fill in all fields');
            response = await login(email, password);
        } else {
            if (!name || !email || !password) return setError('Please fill in all fields');
            
            // --- PASS THE 'role' TO THE register FUNCTION ---
            response = await register(name, email, password, role);
        }

        if (response && !response.success) {
            setError(response.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                </h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 mt-1 border rounded-md"
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                    </div>
                    
                    {/* --- NEW RADIO BUTTONS (Only for Register) --- */}
                    {mode === 'register' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">I am a:</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="student"
                                        checked={role === 'student'}
                                        onChange={() => setRole('student')}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Student</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="educator"
                                        checked={role === 'educator'}
                                        onChange={() => setRole('educator')}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Educator</span>
                                </label>
                            </div>
                        </div>
                    )}
                    {/* --- END OF NEW CODE --- */}

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                
                <p className="text-sm text-center text-gray-600">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    <button
                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        className="ml-1 font-medium text-blue-600 hover:underline"
                    >
                        {mode === 'login' ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginRegister;