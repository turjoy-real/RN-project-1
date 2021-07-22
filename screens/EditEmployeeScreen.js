import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as employeesActions from '../store/action/employees';

import { Picker } from '@react-native-picker/picker';


const EditEmployeeScreen = props => {
  
  if (!props.route.params) { props.navigation.goBack();}

  const empId = props.route.params.empId;
  const editedEmployee = useSelector(state =>
    state.employees.currentEmployees.find(emp => emp.id === empId)
  );

  const [employeeName, setEmployeeName] = useState(editedEmployee.employeeName);
  const [designation, setDesignation] = useState(editedEmployee.designation);
  const [department, setDepartment] = useState(editedEmployee.department);

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    try {
        await dispatch(
          employeesActions.updateEmployee(
            empId,
            employeeName,
            designation,
            department
          )
        );      
      props.navigation.goBack();
    } catch (err) {
      throw(err)
    }    
  }, [dispatch, employeeName, designation, department]);

      return (
        
        <View style={styles.form}>
          <Text>Employee Name</Text>
          <TextInput
            placeholder="Employee Name"
            value={employeeName}
            style={styles.input}
            errorText="Please enter a valid name!"
            keyboardType="default"
            returnKeyType="next"
            maxLength={10}
            onChangeText={
              (e) => {
                setEmployeeName(e.replace(/[^A-Za-z ]/ig, ''));                
            }
          }
            defaultValue={employeeName}
            required
            />
          <Text>Designation</Text>
          <TextInput
            placeholder="Designation"
            value={designation}
            style={styles.input}
            errorText="Please enter a valid designation!"
            keyboardType="default"
            returnKeyType="next"
            maxLength={30}
            textContentType="name"
            onChangeText={
              (e) => {
                setDesignation(e.replace(/[^A-Za-z ]/ig, ''));
                
            }
          }
            defaultValue={designation}
            required
/>
        <Text>Department</Text>
        <Picker                    
              style = {styles.picker}
              selectedValue={department}
              onValueChange={(itemValue, itemIndex) =>
                {setDepartment(itemValue)}              
            }>
            <Picker.Item label="Development" value="Development" />
            <Picker.Item label="Marketing" value="Marketing" />
            <Picker.Item label="Administration" value="Administration" />
            </Picker>
          
         <Button title="Submit" onPress={submitHandler} color='green'/>
        </View>
    
  );
};


const styles = StyleSheet.create({
  form: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {

    backgroundColor: "#e0e0e0",
    textAlign: 'center',    
    paddingHorizontal: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5 
  },

  picker : {
    width: 180,
    height: 50,
    marginBottom: 30,
  },
     
});




export default EditEmployeeScreen;
