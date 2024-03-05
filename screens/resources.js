import React from "react";
import { useState } from "react";
import { RefreshControl,ScrollView,View, Text, StyleSheet} from "react-native";

function Resources () {
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        <View>
           <Text style={styles.head}>Resources</Text>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 head:{
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "900",
    color:"#90dda2"
 }

})

export default Resources


