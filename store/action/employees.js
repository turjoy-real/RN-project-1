import axios from 'axios';
import Employee from '../../models/Employees';

export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';



export const fetchEmployees = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                'https://test-11348-default-rtdb.firebaseio.com/employees.json',
              );

            const resData = await response.data;
            
            const loadedEmployees = [];

            for (const key in resData) {
                loadedEmployees.push(
                    new Employee(
                        key,
                        resData[key].employeeName,
                        resData[key].designation,
                        resData[key].Department
                    )
                )
            }

            dispatch({
                type: SET_EMPLOYEES,
                employees: loadedEmployees
            });
        } catch (err) {
            throw err
        }
    }
}

export const updateEmployee = (id, employeeName, designation, department) => {
    return async (dispatch) => {
        const response = await axios.patch(`https://test-11348-default-rtdb.firebaseio.com/employees/${id}.json`, 
        {
            employeeName : employeeName,
            designation: designation,
            Department: department
        });

        if (!response.request._sent) {
            throw new Error('Something went wrong!');
          }

        dispatch({
            type: UPDATE_EMPLOYEE,
            eid: id,
            employeeData: {
             employeeName,
             designation,
             department
            }
          });
    }
}