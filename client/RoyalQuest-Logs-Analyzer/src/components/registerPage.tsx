import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const RegistrationPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const login = e.currentTarget.value;
    const loginPattern = /^[a-zA-Z0-9-_]*$/;

    if (loginPattern.test(login)) {
      setLogin(login);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    setPassword(password);
    setPasswordError('');
  };

  const validatePassword = (password: string) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validatePassword(password)) {
      try {
        const createUser = await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/auth/register',
          data: {
            login,
            password,
          },
        });

        if (createUser.status === 201) {
          setMessage('User successfully registered');
          setSuccess(true);
        } else {
          setMessage(`Error creating user. Try again later`);
          setSuccess(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data.error);
          setSuccess(false);
        } else {
          setMessage('Something went wrong. ' + error);
          setSuccess(false);
        }
      } finally {
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    } else {
      setPasswordError('Password must be at least 8 characters long and contain both letters and numbers');
    }
  };

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4 mt-32">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Typography variant="h4" className="font-bold text-center">
          Registration
        </Typography>
        <FormControl>
          <InputLabel htmlFor="login">Create a username</InputLabel>
          <Input
            id="login"
            aria-describedby="create user login"
            required
            name="login"
            autoComplete="off"
            value={login}
            onChange={handleLoginChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Create a password</InputLabel>
          <Input
            id="password"
            aria-describedby="create user password"
            name="password"
            type="password"
            value={password}
            required
            autoComplete="off"
            onChange={handlePasswordChange}
            error={!!passwordError}
          />
          <FormHelperText id="password" error className="w-[300px]">
            {passwordError}
          </FormHelperText>
        </FormControl>
        <Button type="submit" color="success" variant="contained">
          Register
        </Button>
      </form>
      <Typography className={`h-6 ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</Typography>
    </div>
  );
};

export default RegistrationPage;
