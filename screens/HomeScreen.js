import React, { useEffect, useState } from 'react';
import { Modal, TouchableHighlight, StatusBar, View, Text, FlatList, Alert, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import * as employeesActions from '../store/action/employees';

import Employees from '../components/Employees';


const HomeScreen = props => {

  const employees = useSelector(state => state.employees.currentEmployees);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [employeeName, setEmployeeName] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [id, setId] = useState();




  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(employeesActions.fetchEmployees()).then(() => {
      
      setIsLoading(false);
      
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{marginTop: 100}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };
 
  if (modalVisible) {
      return(
      <View style={styles.centeredView}>

        <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      }}>

        {/* Details */}
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
         
          <Text style={styles.modalText}>{employeeName}</Text>
          <Text style={styles.modalText}>{designation}</Text>
          <Text style={styles.modalText}>{department}</Text>

       
      <View style={{flexDirection: 'row'}}>


        {/* Update Button */}
      <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: 'green' }}
          onPress={() => {
            props.navigation.navigate('Edit Employee Details', {
              empId: id
            });
            setModalVisible(!modalVisible)
          }}
          >
          <Text style={styles.textStyle}>Update</Text>
        </TouchableHighlight>


          {/* Cancel Button */}
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: 'green' }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          >
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableHighlight>
      </View>
       
      </View>
      
      </View>
      </Modal>
      </View>
      )
  }
 

  return (
    
    <SafeAreaView style={styles.container}>
      
      
        <FlatList 
        data={employees}
        numColumns={3}
        renderItem={itemData => (
           <Employees
           employeeName={itemData.item.employeeName}
           designation={itemData.item.designation}
           department={itemData.item.department}
           onSelect={ () => {
            setModalVisible(true);
            setEmployeeName(itemData.item.employeeName);
            setDepartment(itemData.item.department);
            setDesignation(itemData.item.designation);
            setId(itemData.item.id);
           }
            
           }
         >
         </Employees>
        )} keyExtractor={item => item.id} />
     
    
    </SafeAreaView>  
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default HomeScreen;
