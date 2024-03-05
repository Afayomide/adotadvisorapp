import React from "react";
import { useState } from "react";
import { Dimensions, RefreshControl,ScrollView,View, Text, StyleSheet} from "react-native";

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
        <View style={styles.container}>
           <Text style={styles.head}>Resources</Text>
           <Text style={styles.resources}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos</Text>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: Dimensions.get("window").height-200,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
 head:{
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "900",
    color:"#90dda2"
 },
 resources: {
    textAlign:"center"
 }

})

export default Resources


