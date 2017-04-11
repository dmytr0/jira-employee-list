package ua.softlist.employee.jira.DAO;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.transaction.TransactionCallback;
import net.java.ao.Query;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.softlist.employee.jira.Beans.Employee;
import ua.softlist.employee.jira.Entity.EmployeeEntity;

@Component
public class EmployeeDAO {
    private final ActiveObjects ao;
    private static final Logger log = Logger.getLogger(EmployeeDAO.class);

    @Autowired
    public EmployeeDAO(@ComponentImport ActiveObjects ao) {
        this.ao = ao;
    }

    public EmployeeEntity getEmployeeById (final int id){
        log.trace("Getting Employee by id " + id);
        return ao.executeInTransaction(new TransactionCallback<EmployeeEntity>() {
            public EmployeeEntity doInTransaction() {
                EmployeeEntity[] employeeEntities = ao.find(EmployeeEntity.class, Query.select().where("ID = ?", id));
                if(employeeEntities != null && employeeEntities.length > 0) {
                    log.trace("Employee founded! id = " + id);
                    return employeeEntities[0];
                }else{
                    log.trace("Employee not founded! id = " + id);
                    return null;
                }
            }
        });
    }

    public EmployeeEntity[] getAllEmployee (){
        log.trace("Getting Employees list");
        return ao.find(EmployeeEntity.class);

    }

    public EmployeeEntity saveEmployee (final Employee employee){

        if(employee == null) return null;

        int id = employee.getId();
        if(id > 0){
            EmployeeEntity employeeEntity = getEmployeeById(id);
            if(employeeEntity != null){
                log.trace("Updating employee ... ");
                translateToEntity(employeeEntity,employee);
                employeeEntity.save();
                return employeeEntity;
            }
        }


        log.trace("Saving employee");
        return ao.executeInTransaction(new TransactionCallback<EmployeeEntity>() {
            public EmployeeEntity doInTransaction() {
                EmployeeEntity entity = ao.create(EmployeeEntity.class);
                translateToEntity(entity, employee);
                entity.save();
                return entity;
            }
        });
    }

    public void deleteEmployee(int id){
        EmployeeEntity employeeById = getEmployeeById(id);
        ao.delete(employeeById);
    }

    private void translateToEntity(EmployeeEntity employeeEntity, Employee employee){
        String emBirthday = employee.getEmBirthday();
        String emDep = employee.getEmDep();
        String emEmail = employee.getEmEmail();
        String emExtPhone = employee.getEmExtPhone();
        String emInPhone = employee.getEmInPhone();
        String emName = employee.getEmName();
        String emPosition = employee.getEmPosition();
        String img = employee.getImg();

        if(emBirthday !=null) {
            employeeEntity.setEmBirthday(emBirthday);
        }
        if(img !=null) {
            employeeEntity.setImg(img);
        }
        if(emDep !=null) {
            employeeEntity.setEmDep(emDep);
        }
        if(emEmail !=null) {
            employeeEntity.setEmEmail(emEmail);
        }
        if(emExtPhone !=null) {
            employeeEntity.setEmExtPhone(emExtPhone);
        }
        if(emInPhone !=null) {
            employeeEntity.setEmInPhone(emInPhone);
        }
        if(emName !=null) {
            employeeEntity.setEmName(emName);
        }
        if(emPosition !=null) {
            employeeEntity.setEmPosition(emPosition);
        }

    }


}
