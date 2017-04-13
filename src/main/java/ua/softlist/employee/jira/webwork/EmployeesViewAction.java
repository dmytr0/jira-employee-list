package ua.softlist.employee.jira.webwork;

import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.security.groups.GroupManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.jira.user.util.UserManager;
import com.atlassian.jira.web.action.JiraWebActionSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EmployeesViewAction extends JiraWebActionSupport
{
    private static final Logger log = LoggerFactory.getLogger(EmployeesViewAction.class);

    private boolean isHr = false;

    @Override
    public String execute() throws Exception {
        GroupManager groupManager = ComponentAccessor.getGroupManager();
        UserManager userManager = ComponentAccessor.getUserManager();

        ApplicationUser loggedInUser = getLoggedInUser();

        if(loggedInUser == null || !userManager.isUserExisting(loggedInUser)) return ERROR;
        isHr = groupManager.isUserInGroup(loggedInUser, "hr360");
        return super.execute();
    }

    public boolean getIsHr() {
        return isHr;
    }
}
