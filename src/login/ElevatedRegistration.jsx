import axios from 'axios';
import { useState } from 'react';

function ElevatedRegistration({ setLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    userType: 'user', // Default value
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { username, password, name, phone, address, userType } = formData;

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
        userType,
      });

      alert(response.data.message);
      setErrorMessage('');

      // Automatically log the user in after registration
      localStorage.setItem('user', username);
      setLogin(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during registration.'
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      userType: 'user',
    });
    setErrorMessage('');
  };

  return (
    <div className="flex p-4 border flex-1 flex-col rounded w-full items-center">
      <p className="text-gray-400 border-b mb-4">Elevated Registration</p>

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <form className="flex flex-wrap gap-4 w-full">
        {['username', 'password', 'name', 'phone', 'address'].map((field) => (
          <div key={field} className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
            <label className="ml-2 text-[10px] text-slate-600">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
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

        {/* User Type Select */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">User Type</label>
          <select
            name="userType"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
            <option value="superAdmin">Super Admin</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="p-0 m-0 max-w-sm min-w-[100px] flex gap-2">
          <button
            type="button"
            onClick={handleRegister}
            className="flex w-full mt-6 bg-red-900 hover:bg-white hover:text-pink-900 text-white cursor-pointer text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex w-full mt-6 bg-gray-400 hover:bg-white hover:text-gray-900 text-white cursor-pointer text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ElevatedRegistration;
