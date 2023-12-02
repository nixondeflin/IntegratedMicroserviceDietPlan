import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import querystring from 'querystringify';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signInToApis = async () => {
    try {
      const apiUrlSignIn1 = 'https://dietplans.azurewebsites.net/signin';
      const apiUrlSignIn2 = 'https://fitness-coaching.azurewebsites.net/login';

      const [response1, response2] = await Promise.all([
        axios.post(apiUrlSignIn1, {
          username: username,
          password: password,
        }),
        axios.post(apiUrlSignIn2, {
          username: username,
          password: password,
        }),
      ]);

      if (response1.data.token || response2.data.access_token) {
        const token1 = response1.data.token;
        const token2 = response2.data.access_token;

        sessionStorage.setItem('token1', token1);
        sessionStorage.setItem('token2', token2);
        sessionStorage.setItem('username', username);

        navigate('/home');
      } else {
        console.log(response1.data, response2.data);
        alert('Login gagal. Coba lagi.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          console.log(error);
          setError('Kombinasi username dan password tidak valid.');
        } else {
          console.log(error);
          setError('Terjadi kesalahan. Silakan coba lagi.');
        }
      } else if (error.request) {
        console.log(error);
        setError('Terjadi kesalahan dalam mengirim permintaan.');
      } else {
        console.log(error);
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInToApis();
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Text bgGradient='linear(to-l, #22C35E, #68FB4B)' bgClip='text' fontSize='3xl' fontWeight='extrabold'>Welcome to Health Hub Service</Text>
          <Text fontSize={'lg'} color={'gray.600'}>
            <i>Let's Go Healthy Together!</i>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Heading fontSize={'2xl'}>Sign In</Heading>
          <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={handleUsernameChange} required />
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack align={'center'}>
              <Text fontSize={'md'} color={'gray.600'}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link to={`/register`} style={{ textDecoration: 'underline' }}>
                    <strong>Don't have an account?</strong>
                  </Link>
              </Text>
            </Stack>
            <Stack spacing={10} mt={5}>
              <Button type='submit'
                bg={'whatsapp.400'}
                color={'white'}
                _hover={{
                  bg: 'whatsapp.800',
                }}>
                Sign in
              </Button>
            </Stack>
          </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignIn;