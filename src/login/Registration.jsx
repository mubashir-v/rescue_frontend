import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
function Registration({ setLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    address: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration
  const handleRegister = async () => {
    const { username, password, name, phone, address } = formData;

    if (!username || !password || !name || !phone || !address) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        password,
        name,
        phone,
        address,
      });

      alert(response.data.message);
      setErrorMessage('');
      navigate("/login");
      // Automatically log the user in after registration
      
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during registration.'
      );
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col gap-2 items-center justify-center h-[600px] w-1/2 border">
        <p className="text-sm text-gray-400">Registration</p>

        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}

        {/* Input Fields */}
        {['username', 'password', 'name', 'phone', 'address'].map((field) => (
          <div
            key={field}
            className="h-12 p-0 m-0 max-w-sm min-w-[200px]"
          >
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-row gap-2">
          <div
            className="flex text-center justify-center p-2 rounded-lg h-10 border bg-green-900 text-white cursor-pointer"
            onClick={handleRegister}
          >
            Register
          </div>
          <div className="flex text-center justify-center p-2 rounded-lg h-10 border bg-red-900 text-white">
            Cancel
          </div>
        </div>
        <div className="text-gray-400">
          Existing user ? <NavLink className="text-blue-700" to="/login">Click Here</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Registration;
