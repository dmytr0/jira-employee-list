package ua.softlist.employee.jira.Beans;


import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
public class Employee {

    @JsonProperty
    private int id;
    @JsonProperty
    private String emName;
    @JsonProperty
    private String emDep;
    @JsonProperty
    private String emInPhone;
    @JsonProperty
    private String emExtPhone;
    @JsonProperty
    private String emEmail;
    @JsonProperty
    private String emBirthday;
    @JsonProperty
    private String emPosition;
    @JsonProperty
    private String img;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getEmName() {
        return emName;
    }

    public void setEmName(String emName) {
        this.emName = emName;
    }

    public String getEmDep() {
        return emDep;
    }

    public void setEmDep(String emDep) {
        this.emDep = emDep;
    }

    public String getEmInPhone() {
        return emInPhone;
    }

    public void setEmInPhone(String emInPhone) {
        this.emInPhone = emInPhone;
    }

    public String getEmExtPhone() {
        return emExtPhone;
    }

    public void setEmExtPhone(String emExtPhone) {
        this.emExtPhone = emExtPhone;
    }

    public String getEmEmail() {
        return emEmail;
    }

    public void setEmEmail(String emEmail) {
        this.emEmail = emEmail;
    }


    public String getEmBirthday() {
        return emBirthday;
    }

    public void setEmBirthday(String emBirthday) {
        this.emBirthday = emBirthday;
    }

    public String getEmPosition() {
        return emPosition;
    }

    public void setEmPosition(String emPosition) {
        this.emPosition = emPosition;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
