package ua.softlist.employee.jira;

import ua.softlist.employee.jira.Beans.Employee;
import ua.softlist.employee.jira.Entity.EmployeeEntity;

public class Helper {

    public static Employee convert(EmployeeEntity entity){
        Employee employee = new Employee();
        employee.setEmBirthday(entity.getEmBirthday());
        employee.setEmDep(entity.getEmDep());
        employee.setEmEmail(entity.getEmEmail());
        employee.setEmExtPhone(entity.getEmExtPhone());
        employee.setEmInPhone(entity.getEmInPhone());
        employee.setEmName(entity.getEmName());
        employee.setId(entity.getID());
        employee.setEmPosition(entity.getEmPosition());
        employee.setImg(entity.getImg());

        return employee;
    }

    public static Employee[] convert(EmployeeEntity[] entity){
        if(entity == null || entity.length == 0) return null;
        Employee[] employees = new Employee[entity.length];
        for (int i = 0; i < entity.length; i++){
            employees[i] = convert(entity[i]);
        }
        return employees;
    }
}
