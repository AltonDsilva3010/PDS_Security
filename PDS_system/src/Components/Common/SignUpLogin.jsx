import React, { useState } from 'react';




// SignUp And Login Components 
const SignUpLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Farmer');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle SignUp logic
      if (password === confirmPassword) {
        // Perform SignUp API call or other actions
        console.log('SignUp successful');
      } else {
        console.log('Passwords do not match');
      }
    } else {
      // Handle SignIn logic
      // Perform SignIn API call or other actions
      console.log('SignIn successful');
    }
  };

  return (
    <div className='shadow-md bg-white rounded-md p-[20px] flex flex-col items-center'>
      <h2 className='font-extrablack mb-[10px]'>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit} className='flex flex-col w-full'>

        <input
          type="email"
          className='mb-[10px] border-[2px] rounded-md'
          value={email}
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder='Enter Password'
          className='mb-[10px] border-[2px] rounded-md'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isSignUp && (
          
            <input
              type="password"
              className='mb-[10px] border-[2px] rounded-md'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
        )}

        <select value={role} onChange={(e) => setRole(e.target.value)} className='mb-[10px] border-[2px] rounded-md h-[50px]'>
          <option value="#" disabled selected>Select  Your Role</option>
          <option value="Farmer">Farmer</option>
          <option value="FCI Officer">FCI Officer</option>
          <option value="APMC Officer">APMC Officer</option>
          <option value="Business">Business</option>
          <option value="User">User</option>
        </select>

        <button className="bg-blue-500 rounded-md text-white mb-[10px] px-[10px] py-[8px] cursor-pointer"
        type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>

      <p 
      className='text-blue-500 cursor-pointer'
      onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default SignUpLogin;
