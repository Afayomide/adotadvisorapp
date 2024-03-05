import React from 'react';
import {Dimensions, View, Image, Text, StyleSheet } from 'react-native';


const Card = ({ icon, imgsrc, h3, text }) => {
  return (
    <View style={styles.homecard}>
      <View>
        <Image source={imgsrc} style={styles.image} />
      </View>
      <View style={styles.cardTexts}>
        <View style={styles.homeIc}>{icon}</View>
        <Text style={styles.h3}>{h3}</Text>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homecard: {
    alignSelf: "center",
    flexDirection: 'row',
    flex: 1,
    marginTop: 20
  },
  h3:{
  fontWeight: "800",
  },
  image: {
    width: 50, // Adjust width and height as desired
    height: 50,
  },
  cardTexts: {
    // Add styles for text layout and formatting
  },
  homeIc: {

  },
  paragraph: {
    width: Dimensions.get("window").width - 50
  }
});

export default Card;
