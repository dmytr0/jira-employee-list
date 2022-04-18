package ua.softlist.employee.jira.Conditions;

import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.plugin.webfragment.conditions.AbstractWebCondition;
import com.atlassian.jira.plugin.webfragment.model.JiraHelper;
import com.atlassian.jira.user.ApplicationUser;

import static com.atlassian.jira.permission.GlobalPermissionKey.of;

public class UserCondition extends AbstractWebCondition {


    @Override
    public boolean shouldDisplay(ApplicationUser applicationUser, JiraHelper jiraHelper) {
        try {
            return ComponentAccessor.getGlobalPermissionManager().hasPermission(of("ua.softlist.employee.view.globalpermission"), applicationUser);
        } catch (Exception e) {
            return false;
        }
    }
}
