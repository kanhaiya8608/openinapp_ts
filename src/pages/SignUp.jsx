import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../client';
import AuthLayout from '../Layout/AuthLayout';
import IconLibrary from '../components/IconLibrary';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      if (error) throw error;
      alert('Check your email for verification link');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-between md:justify-center h-4/5 md:min-h-screen text-left p-6">
      <div></div>
        <div className="w-full md:w-96 ">
          <h2 className="text-3xl sm:text-4xl font-semibold">Sign Up</h2>
          <p className="text-base sm:text-lg mb-4">Create a new account</p>

          <form onSubmit={handleSubmit} className="bg-white rounded">
            <label
              htmlFor="fullName"
              className="block text-sm sm:text-base font-medium text-gray-700 pb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full mb-2 sm:mb-4 p-2 border border-gray-300 rounded-lg"
            />

            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700 pb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-2 sm:mb-4 p-2 border border-gray-300 rounded-lg"
            />

            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-700 pb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full mb-2 sm:mb-4 p-2 border border-gray-300 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white p-2 rounded-lg cursor-pointer"
            >
              Sign Up
            </button>

            <p className="mt-4 text-sm text-center sm:text-base text-gray-500">
              Already have an account? <span className='block md:inline'><Link className='text-blue-400' to="/">Login</Link></span> 
            </p>
          </form>
        </div>
<div className='md:hidden'>
   <IconLibrary color='black' className='pt-6'/>
   </div>
      </div>
    </AuthLayout>
  );
};
export default SignUp;