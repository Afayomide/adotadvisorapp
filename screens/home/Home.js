
import {RefreshControl, SafeAreaView,ScrollView, Pressable, View, Text,StyleSheet, Image } from 'react-native';
import Table from './table';
import React from 'react';
import { useState, useEffect } from 'react';
import  {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({navigation}) {
  const Stack = createStackNavigator()
  const [logText , setLogText] = useState("Login")
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      storedToken = await AsyncStorage.getItem('adotadvisortoken');
      if (storedToken) {
        setLogText("Go to your profile");
      } 
      else{
      setLogText("login")
      }
    };

    checkAuthentication();
  });

  return (
    <>
    <ScrollView
    refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
    >
    <View style={styles.homeContainer}>
        <View style={styles.firstSection}>
          <View style={styles.about}>
            <Text style={styles.aboutText}>
              providing <Text style={styles.highlight}>tested</Text> and {"\n"}
              <Text style={styles.highlight}>approved</Text> advice with{"\n"}
              our world-leading technology.
            </Text>            
            <Image source={require("../../img/robot2.webp")} style={styles.homeRobot} />
          </View>

         {logText == "login" ?
          (
                  <View style={styles.homeButtons}>

          <Pressable style={styles.homeButtonsA1} onPress={() => navigation.navigate("login") } >
        <Text style={styles.buttonText}>{logText}</Text>
      </Pressable>

      <Pressable style={styles.homeButtonsA2} title="signup" onPress={() => navigation.navigate("signup") } >
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      </View>) 
      : (<Pressable style={styles.homeButtonsA3} onPress={() => navigation.navigate("Your Profile") } >
        <Text style={styles.buttonText}>{logText}</Text>
      </Pressable>)}
          
        </View>
      </View>

    <View>



    </View> 
<Table/>
</ScrollView>
</>
  );
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 20,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  about: {
    flex: 1,
    flexDirection: "column",
  },
  aboutText: {
    marginTop: 45,
    marginBottom: 45,
    fontSize: 25,
  },

  homeRobot: {
    width:350,
    height: 300,
    animation: 'float-up-down 2s ease-in-out infinite both',
  },
  homeButtons: {
    marginTop: 50,
    marginBottom: 50,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  greenLink: {
    color: 'green',
  },

    body: {
      backgroundColor: '#f3f3f3', 
      color: '#444',
      scrollBehavior: 'smooth', 
    },
  
    // Home container
    homeContainer: {
      margin: 20, 
      paddingTop: '10vh',
    },
  
    // First section
    firstSection: {
      height: '80vh', 
    },
  
  
    h3: {
      fontSize: 30, 
    },
  
    // Highlight element
    highlight: {
      position: 'relative',
    },
  

  
  
    // First button
    homeButtonsA1: {
      backgroundColor: '#5ec576',
      color: 'white',
      padding: 10,
      width: 80,
      alignItems: "center",
      borderRadius: 30,
      marginRight: 20, // Use consistent unit (px or rem)
    },
  
    // Second button
    homeButtonsA2: {
      borderColor: '#5ec576',
      borderWidth: 1,
      padding: 10,
      width: 80,
      borderRadius: 30,
      color: '#444',
      alignItems: "center"
    },  
     homeButtonsA3: {
      backgroundColor: '#5ec576',
      borderColor: '#5ec576',
      borderWidth: 1,
      padding: 10,
      marginTop:30,
      borderRadius: 30,
      color: '#444',
      alignItems: "center"
    },
  
 
  
    // General button styles
    homeButtonsA: {
      textAlign: 'center',
      textDecoration: 'none',
    },
  
    // Highlight after element
    highlightAfter: {
      // ... adjust styles as needed
    },
  
    // Home card container
    homecardContainer: {
      // ... define styles as needed
    },
  
    // Home card
    homecard: {
      padding: 20,
      width: '80%',
      marginHorizontal: 'auto',
      backgroundColor: '#fff',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  
    // Home card image
    homecardImg: {
      width: 150, // Use consistent unit (px or rem)
    },
  
   
    // Card text
    cardTexts: {
      width: '50%',
      fontSize: 16, // Use consistent unit (px or rem)
    },
});

export default Home;