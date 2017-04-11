package ua.softlist.employee.jira.Entity;

import net.java.ao.Entity;
import net.java.ao.schema.StringLength;

public interface EmployeeEntity extends Entity {


    String getEmName();
    void setEmName(String emName);

    String getEmDep();
    void setEmDep(String emDep);

    String getEmInPhone();
    void setEmInPhone(String emInPhone);

    String getEmExtPhone();
    void setEmExtPhone(String emExtPhone);

    String getEmEmail();
    void setEmEmail(String emEmail);

    String getEmBirthday();
    void setEmBirthday(String emBirthday);

    String getEmPosition();
    void setEmPosition(String emPosition);

    @StringLength(StringLength.UNLIMITED)
    String getImg();
    @StringLength(StringLength.UNLIMITED)
    void setImg(String img);
}
