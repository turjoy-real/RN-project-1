import {
    SET_EMPLOYEES,
    UPDATE_EMPLOYEE
} from '../action/employees';
import Employee from '../../models/Employees';

const initialState = {
    currentEmployees: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEES:
            return {
                currentEmployees: action.employees
            };

        case UPDATE_EMPLOYEE:
            const employeeIndex = state.currentEmployees.findIndex(
                emp => emp.id === action.eid
            );

            const updatedEmployee = new Employee(
                action.eid,
                action.employeeData.employeeName,
                action.employeeData.designation,
                action.employeeData.department
            )

            const updatedCurrentEmployees = [...state.currentEmployees];
            updatedCurrentEmployees[employeeIndex] = updatedEmployee;

            return {
                ...state,
                currentEmployees: updatedCurrentEmployees
            }
    }
    return state
}