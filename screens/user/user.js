import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native'; // Use React Native components
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for local storage
import Tolerance from './toleranceLevel';

function User({ token, onLogout, navigation }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('adotadvisortoken');
      await AsyncStorage.removeItem('username');
      setAuthenticated(false);
      navigation.navigate("Adot-Advisor")
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error logging out');
    }
  };

  var storedToken = null

  useEffect(() => {
    const checkAuthentication = async () => {
      storedToken = await AsyncStorage.getItem('adotadvisortoken');
      if (storedToken) {
        setAuthenticated(true);
      } 
      else if (storedToken == null) {
        navigation.navigate("Adot-Advisor")
      }
    };

    checkAuthentication();
  }, [handleLogout]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adotadvisor-u4zq.vercel.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await AsyncStorage.setItem('username', response.data.name);
        setName(AsyncStorage.getItem("username"));
      } catch (error) {
        console.error('Error:', error);
        setMessage('Error fetching data');
      }
    };
    fetchData();
  });

  return (
    <>
    <View>
      {authenticated ? (
        <View>
          <View>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
  <Text>
    Logout
  </Text>
</Pressable>
            <Text style={styles.welcome}>Welcome, <Text style={{ color: 'green' }}>{name}</Text></Text>



            {/* <Button title="Logout" onPress={handleLogout} />        */}


          </View>      


        </View>
      ) : (
        <View>
          <Text>Dear Employer, Please Login to get access to this content</Text>
        </View>
      )}
    </View> 
    {
      authenticated ? <Tolerance username={name} /> : <Text>OOPS, nothing here</Text>
    }
</>
     
   
  );
}


const styles = StyleSheet.create({
  welcome:{
    margin: 20,
   fontSize: 30,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#5ec576',
    color: "white",
    alignSelf: "center",
    padding: 10,
    width: 80,
    alignItems: "center",
    borderRadius: 30
  
  }
})
export default User;
