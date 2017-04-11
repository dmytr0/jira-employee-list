package ua.softlist.employee.jira.rest;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import ua.softlist.employee.jira.Beans.Employee;
import ua.softlist.employee.jira.DAO.EmployeeDAO;
import ua.softlist.employee.jira.Entity.EmployeeEntity;
import ua.softlist.employee.jira.Helper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path ("em")
@Consumes ({ MediaType.APPLICATION_JSON })
@Produces ({ MediaType.APPLICATION_JSON })
public class MainRest {

    @Autowired
    EmployeeDAO employeeDAO;

    @GET
    @AnonymousAllowed
    @Path("/")
    public Response getEmployees()
    {
        EmployeeEntity[] allEmployee = employeeDAO.getAllEmployee();

        return Response.ok(Helper.convert(allEmployee)).build();
    }
    // /rest/employee/1/em/

    @GET
    @Path("{id}")
    public Response getEmployee (@PathParam("id") final int id)
    {
        EmployeeEntity employeeById = employeeDAO.getEmployeeById(id);
        return Response.ok(Helper.convert(employeeById)).build();
    }

    // /rest/employee/1/em/ {id}

    @PUT
    @Path ("{id}")
    public Response updateEmployee(@PathParam ("id") final int id, final Employee bean)
    {
        bean.setId(id);
        EmployeeEntity employeeEntity = employeeDAO.saveEmployee(bean);
        return Response.ok(Helper.convert(employeeEntity)).build();
    }


    @POST
    public Response createEmployee(final Employee bean)
    {
        EmployeeEntity employeeEntity = employeeDAO.saveEmployee(bean);
        return Response.ok(Helper.convert(employeeEntity)).build();
    }

    @DELETE
    @Path ("{id}")
    public Response delete(@PathParam ("id") final int id)
    {
        employeeDAO.deleteEmployee(id);
        return Response.ok().build();
    }

}
