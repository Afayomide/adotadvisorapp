import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'; 
import { DataTable } from 'react-native-paper'; 


const Table = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [even, setEven] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://adotadvisor-u4zq.vercel.app/api/instruments'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function renderItem ({ item }) { 
    const integer = parseInt(item.RiskScore, 10);
    const rowStyle = item.RiskScore % 2 === 0 ? styles.evenrow : styles.row; // Conditionally choose style

   return   (
   
       <View style={rowStyle}>
      <Text style={styles.cellText}>{item.RiskScore}</Text>
      <Text style={styles.cellText}>{item.nigerianStocks}</Text>
      <Text style={styles.cellText}>{item.foreignStocks}</Text>
      <Text style={styles.cellText}>{item.techStocks}</Text>
      <Text style={styles.cellText}>{item.emergingStocks}</Text>
      <Text style={styles.cellText}>{item.nigerianBonds}</Text>
      <Text style={styles.cellText}>{item.foreignBonds}</Text>
      <Text style={styles.cellText}>{item.commodities}</Text>
      <Text style={styles.cellText}>{item.realEstate}</Text>
      <Text style={styles.cellText}>{item.tBills}</Text>
      <Text style={styles.cellText}>{item.Alternative}</Text>
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Instruments Weight, Adds Up To 100%({loading ? "fetching": "fetched"} from mongoDB)
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#90dda2" />
      ) : (
        <ScrollView horizontal={true}>
        <DataTable style={styles.table}>  
        <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title style={styles.tableTitle}>RiskScore</DataTable.Title> 
        <DataTable.Title style={styles.tableTitle}>Nigerian Stocks</DataTable.Title> 
        <DataTable.Title style={styles.tableTitle}>Foreign Stocks</DataTable.Title> 
        <DataTable.Title style={styles.tableTitle}>Tech Stocks</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>Emerging Stocks</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>Nigerian Bonds</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>Foreign Stocks</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>Commodities</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>Real Estate</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>T-Bills</DataTable.Title>
        <DataTable.Title style={styles.tableTitle}>Alternative</DataTable.Title>
      </DataTable.Header>  
        <FlatList
          data={datas}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        </DataTable>
      </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableTitle:{
   marginRight: 10,
  },
  table:{
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },  
  evenrow: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: '#5ec576',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cellText: {
    textAlign: "center",
    width: 50
  }, tableHeader: { 
    backgroundColor: '#d2e33', 
  }, 
});

export default Table;
