import { View } from "react-native";
import AboutData from "./aboutData";
import Card from "./card";
import { ScrollView } from "react-native-gesture-handler";

function About () {
    return(
      <ScrollView>
        <View>
{AboutData.map(Card)}
        </View>
        </ScrollView>
    );
  };
  


export default About