import React from "react"
import { RefreshControl,ScrollView,View, Text, StyleSheet} from "react-native";
import AboutData from "./aboutData";
import Card from "./card";
import { useState } from "react";

function About () {
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

    return(
      <ScrollView
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
      <Text style={styles.head}>About</Text>
        <View>
{AboutData.map(Card)}
        </View>
        </ScrollView>
    );
  };


  
const styles = StyleSheet.create({
  head:{
     alignSelf: "center",
     fontSize: 30,
     fontWeight: "900",
     color:"#90dda2"
  }
 
 })
  


export default About