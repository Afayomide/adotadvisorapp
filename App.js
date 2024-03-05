import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './screens/home/Home.js';
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import LoginForm from './screens/login.js';
import SignupForm from './screens/signup.js';
import About from './screens/about/about.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import  {createStackNavigator} from '@react-navigation/stack'
import Table from './screens/home/table.js';
import User from './screens/user/user.js';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import Resources from './screens/resources.js';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5ec576"
  }
}


function MyTabs() {
  return(
   <Tab.Navigator
   initialRouteName='Your Profile'
   screenOptions={({route}) =>({
    tabBarIcon: ({focused, color,size}) => {
      let iconName;
      if(route.name ==="Your Profile") {
         color = focused ? "#5ec576" : "grey"
        iconName = focused ? "person-circle"
            : "person-circle-outline"
      }
      else if( route.name === "about"){
        color = focused ? "#5ec576" : "grey"
        iconName = "information"
      }
      else if(route.name === "Home") {
        color = focused ? "#5ec576" : "grey"
        iconName = "home"
      }else if(route.name === "Resources") {
        color = focused ? "#5ec576" : "grey"
        iconName = "gift"
      }
      return <Ionicons name={iconName} size={size} color={color}/>
    }
   }) 
   
   }
   >
   <Tab.Screen name="Home" component={Home}
      options={{
        headerShown: false,
        title: "Home",
      tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#5ec576":"grey"}}>home</Text>),

    }}
   />
  <Tab.Screen name='Your Profile' component={User}
    options={{
      headerShown: false,
      title: "Your Profile",
      tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#5ec576":"grey"}}>profile</Text>),
    }}   
  />
  <Tab.Screen name="about" component={About}
  options= {{
    headerShown: false,
    tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#5ec576":"grey"}}>about</Text>),
    
  }}
  />
    <Tab.Screen name="Resources" component={Resources}
  options= {{
    headerShown: false,
    tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#5ec576":"grey"}}>Resources</Text>),
    
  }}/>
</Tab.Navigator> 
  )
}

function HomeHeader ({name}) {
  return(
    <View
    style={styles.headerView}>  
     <Text style={styles.headerText}>
        {name}
      </Text>
      <Image
      source={require("./img/robot.webp")}
      style={styles.headerImage}/>
   
    </View>
  )
}

export default function App() {
 

  return (
    <NavigationContainer theme={MyTheme}>
    <Stack.Navigator 
    initialRouteName='Adot-Advisor'
    screenOptions={({route}) =>({
  headerStyle: {backgroundColor: "#5ec576"},
  headerTitle: (props)=> <HomeHeader name={route.name}/>
    })
   }>
    
    
    <Stack.Screen name="Adot-Advisor" component={Home}
      options={{title: "Adot-Advisor", }}
    />
          <Stack.Screen name="login" component={LoginForm} />
          <Stack.Screen name="signup" component={SignupForm}/>

          {/* <Stack.Screen name="user" component={User}/> */}
          <Stack.Screen name="Your Profile" component={MyTabs}/>
    </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {

    width: Dimensions.get('window').width - 320,
    resizeMode: "contain",
    alignSelf:  "center"
  },
  headerView: {
    backgroundColor: "#5ec576",
    flex: 1,
    width: Dimensions.get('window').width ,
      display: "flex",
      flexDirection: 'row',
      justifyContent: "space-evenly",    
  },
  headerText: {
    fontWeight: "900",
    alignSelf:  "center"
  }
});
