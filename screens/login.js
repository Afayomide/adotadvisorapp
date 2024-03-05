import React, { useState } from 'react';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Table from './home/table';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const navigation = useNavigation()
  const [check, setCheck] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = "9ffbceda69ff903370209d5029c4416b4890df44f9c19962430765595735a57d";
  const [err, setErr] = useState('');
  const [changePassword, setChangePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  const handlePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleUsernameChange = (text) => {
    const regex = /^[a-zA-Z0-9_.-]*$/; // Allow letters, numbers, underscores, dots, and hyphens
    if (!regex.test(text)) {
      setErrorMessage('Username can only contain letters, numbers, underscores, dots, and hyphens.');
    } 
    else if (text.length > 10) {
          setErrorMessage ("username too long")
    }
    else {
      setErrorMessage(null); // Clear error message if input is valid
      setUsername(text);
    }
    
  };

  const handlePasswordChange = (text) => {
    if (text.length > 20) {
      setErrorMessage('password too long');
    } else {
      setErrorMessage(null); // Clear error message if input is valid
      setPassword(text);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setCheck(true);

      const response = await axios.post('https://adotadvisor-u4zq.vercel.app/api/login', {
        username,
        password,
      });

      const { success } = response.data;

      if (success) {
        AsyncStorage.setItem('adotadvisortoken', token)
          .then(() => {
            setErr('Login successful.');
            console.log('Login successful. Token:');
            navigation.navigate("Your Profile")
          })
          .catch((error) => {
            console.error('Error setting token:', error);
          });

        // ... (Remove token logic after 10 minutes)
      } else {
        setErr(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErr('Login failed. Please try again.');
    } finally {
      setCheck(false);
    }
  };

  return (
    <View style={styles.container}>
    <Image style={styles.loginImage} source={require("../img/robo2.png")}/>
<Text style={styles.error}>{errorMessage}</Text>
      {check && <ActivityIndicator size="large" color="#5ec576" />}
      {err && <Text style={styles.error}>{err}</Text>}

<View style={styles.usernameInputContainer}>
   <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
        autoCapitalize="none"
      />
</View>
     
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={changePassword}
          value={password}
          onChangeText={handlePasswordChange}
          autoCapitalize="none"
        />
        <Pressable style={styles.passwordToggle} onPress={handlePassword}>
          <Text style={styles.passwordToggleText}>{changePassword ? <Feather name="eye" size={24} color="#5ec576" /> : <Feather name="eye-off" size={24} color="#5ec576" />}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    height: Dimensions.get("window").height - 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#fd424b', 
  },
  form: {
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pwdIcons: {
    zIndex: 5,
    position: 'absolute',
  },
  pwdInputIcons: {
    width: '100%',
    marginBottom: 10,
  },
  eye: {
    marginLeft: 15, 
    color: '#5ec576', 
  },
  pwdInputField: {
    zIndex: -1,
    width: '100%',
    textAlign: 'center',
  },
  green: {
    color: 'green',
  },
  formContent: { 
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: { 
    fontWeight: '600',
    fontSize: 20, 
  },
  input: {
    width: 300, 
    marginBottom: 10,
    border: 2,
    borderColor: '#5ec576', 
    borderRadius: 5,
  },
  passwordInput:{ 
    width: 300, 
    paddingLeft: 10,
    marginBottom: 10,
    border: 2,
    borderColor: '#5ec576', 
    borderRadius: 5,
  },
  usernameInputContainer: {
    marginBottom: 5,
    flexDirection: 'row', // Arrange elements horizontally
    alignItems: 'center', // Align vertically
    borderWidth: 1,
    borderColor: "#5ec576",
    borderStyle: "dotted",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
   marginBottom:5,
    flexDirection: 'row', // Arrange elements horizontally
    alignItems: 'center', // Align vertically
    borderWidth: 1,
    borderColor: "#5ec576",
    borderStyle: "dotted",
    borderRadius: 5,
  },
  iconContainer: {
    marginRight: 10, // Add margin between icon and input
  },
  textInput: { 
    width: 300, 
    marginBottom: 10,
    padding: 10, 
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 5,
  },
  loginImage: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
  },
  buttonText: {
    backgroundColor: "#5ec576",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    color: "black"
  }
});




export default LoginForm;
