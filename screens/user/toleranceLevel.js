import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Image, Button, ActivityIndicator, StyleSheet,Pressable} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tolerance = ({ username, token }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [level, setLevel] = useState('');
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("")


  const withs = `${username}`;

  const handleSearch = async (e) => {
    e.preventDefault();
if (level.length <= 0) {
  setWarning("enter a number")
}
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    try {
      const serverUrl = 'https://adotadvisor-u4zq.vercel.app/api/search';
      const response = await axios.post(serverUrl, { level });
      setResultData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {     
    const checkAuthentication = async () => {   
        const storedToken =  AsyncStorage.getItem('adotadvisortoken');
      if (storedToken) {
        setAuthenticated(true);
      } 
      else if (storedToken === "") {
       setAuthenticated(false)
      }
    };

    checkAuthentication();
  },[token]);


  const changeLevel = (Text) => {
    setLevel(Text);
  };

  return (
    <View style={styles.container}>
    {authenticated ?(
      <View>
      <View style={styles.searchForm}>
        <Image style={styles.profileImg} source={require('../../img/profile.png')} />
        <View>
          <Text style={styles.searchLabel}>
            Please enter your risk tolerance level
            from 1 - 10
          </Text>
        </View>
        <Text style={styles.warning}>{warning}</Text>
        <TextInput
          style={styles.levelInput}
          keyboardType="numeric" // Specify numeric keyboard for level input
          placeholder="Enter Level"
          onChangeText={changeLevel}
          value={level}
        />
      <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Check portfolio</Text> 
        </Pressable>
        
      </View>
      {loading ? (
        <ActivityIndicator style={styles.toleranceSpinner} size="large" color="#5ec576" />
      ) : (
        resultData && (
          <View style={styles.searchResultContainer}>
            <Text style={styles.greenName}>{withs} portfolio:</Text>
            {resultData.map((item) => (
              <View key={item._id} style={styles.searchResult}>
                <Text>Risk Score: {item.RiskScore}</Text>
                <Text>Nigerian Stocks: {item.nigerianStocks}</Text>
                <Text>Foreign Stocks: {item.foreignStocks}</Text>
                <Text>Tech Stocks: {item.techStocks}</Text>
                <Text>Emerging Stocks: {item.emergingStocks}</Text>
                <Text>Nigerian Bonds: {item.nigerianBonds}</Text>
                <Text>Foreign Bonds: {item.foreignBonds}</Text>
                <Text>Commodities: {item.commodities}</Text>
                <Text>Real Estate: {item.realEstate}</Text>
                <Text>T-Bills: {item.tBills}</Text>
                <Text>Alternative: {item.Alternative}</Text>
              </View>
            ))}
          </View>
        )
      )}
   </View> ) :
   (<Text> Login</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  warning:{
  color: "red",
  },
  searchForm: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  searchLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  levelInput: {
    width: 200,
    textAlign: "center",
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  toleranceSpinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultContainer: {
    padding: 10,
    // Add other styles as needed
  },
  greenName: {
    color: 'green',
    fontWeight: 'bold',
  },
  searchResult: {
    marginBottom: 10,
    // Add other styles as needed
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: '#90dda2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center the text
  },

  searchButtonText: {
    color: 'black', 
    fontSize: 16,
}
});

export default Tolerance
