var isHr = false;
AJS.$(document).ready(function(){


    whoLoggined();

    AJS.$(document).on("change", "input[type=file]", fileSelected);


});

function fileSelected(){



    if (this.files && this.files[0]) {

        var FR= new FileReader();
        var inp = AJS.$(this);
        FR.addEventListener("load", function(e) {
            try {
                var b64 = inp.siblings(".imgb64");

                b64.val(e.target.result);

            }catch (e){
                console.log(e);
            }

        });

        FR.readAsDataURL( this.files[0] );
    }
}

function whoLoggined(){

    AJS.$.ajax({
        url: AJS.contextPath() + "/rest/auth/1/session",
        type: 'get',
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (data) {
            var name = data.name;
            checkUser(name)
        },
        error: function (e) {
            fillTable();
            console.log(e);
        }
    });
}

function checkUser(name){

    AJS.$.ajax({
        url: AJS.contextPath() + "/rest/api/2/user?expand=groups&username=" + name,
        type: 'get',
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (data) {

            var groups = data.groups.items;
            groups.forEach(function(el){
                if(el.name.toUpperCase() === "HR360"){
                    isHr = true;
                }
            });

            fillTable();
        },
        error: function (e) {
            fillTable();
            console.log(e);
        }
    });

}

var restTable;

var bdEditView = AJS.RestfulTable.CustomEditView.extend({
    render: function (self) {
        var $bdate = AJS.$('<input class="aui-date-picker"  name="'+self.name+'" />');
        $bdate.val(self.value);
        return $bdate;
    }
});

var imgEditView = AJS.RestfulTable.CustomEditView.extend({
    render: function (self) {
        var $img = AJS.$('<form>' +
                        '<p style="display:none" id="attach-max-size">10000000</p>'+
                        '<input class="imgfile" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg">'+
                        '<input class="imgb64" name="'+self.name+'" style="display: none" type="text" value="' + self.value + '">' +
                        '<input name="pid" style="display: none" type="text" value="0">' +
            '</form>'

        );

        return $img;
    }
});


var imgViewView = AJS.RestfulTable.CustomReadView.extend({
    render: function (self) {
        var $img;
        if(self && self.value  && self.value.length > 10) {
            $img = AJS.$('<img src="'+ self.value +'" height="30">');

        }else {
            $img = AJS.$('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAAAAADFHGIkAAAAHXRFWHRqaXJhLXN5c3RlbS1pbWFnZS10eXBlAGF2YXRhcuQCGmEAAAHHSURBVHjaXcnpb9owGAZw//9f6aQcW0UcBx9xYFKLQC1ldBvqmMqmjUpQIIQQznKEq9U4QuakmzTt51e23+cBHyRFVhRZVuWzROKNrCpKtEkFoEpyRDmTWDbL5YQSr5IKtHeRc+lqFgp+ST6P9rcaQMmkpkG1FIbB8Ricwi8KFEkSAQPqug6Rf9qdwvC0D16IpkMdGgAjwzC0y8MumD7UxsGv43UyhQyEAU3hFIb5/cFjUMPNw6GoEYxTFDBMMNELL8Gd2hmh3HZ/CykhmAGTUGrkl5vnSX3nwMJ2sy4iRokJOKUM3e6Wq/X+EWW8rb+70xmlHFiMMfJ+uvH95bXhPS/W/iU2GbPiwiQZd7VYVm78+Wp4QUT+p2BcLy5nszSczNefdc7iIm1GOGksnqqVyaLFeBykXwtupSrz8Xwxnpawxf8WnDOC0bfpcDAYPn1ChIgkLii2cuVab9AXBu7Pco5jKooMzVbbg9Gw3/M8r+f1R6N++/6CpoFl2aOe23Vj3W403rjF04BdeR1H6Mai13E6Xt4ErOzatt0R7GjEEdyPFJj3Tqv9n5bz1QTWj/bjP5rN6G5/N0H1ofkaNeoNod6I/q1a5TdkFrmNh+TkvgAAAABJRU5ErkJggrbdEexoxBHcjxSY906r/Z+W89UE1o/24z+azehufzdB9aH5GjXqDaHeiP6tWuU3ZBa5jUIVzVsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMDMtMjFUMTc6MDA6NDgrMTE6MDBIBpwWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTAzLTEyVDA5OjM0OjAzKzExOjAwMqS6YQAAAABJRU5ErkJggg==" height="30">');
        }

        return $img;
    }
});

function fillTable(){

    restTable = new AJS.RestfulTable({
        autoFocus: true,
        el: AJS.$("#employees-table"),

        resources: {
            all: AJS.contextPath() + "/rest/employee/1/em",
            self: AJS.contextPath() + "/rest/employee/1/em"
        },
        columns: [
            {
                id: "emDep",
                header: "Отдел"
            },

            {
                id: "emName",
                header: "Имя"
            },

            {
                id: "emPosition",
                header: "Должность"
            },

            {
                id: "emInPhone",
                header: "Вн. тел."
            },
            {
                id: "emExtPhone",
                header: "Личный тел."
            },
            {
                id: "emEmail",
                header: "e-mail"
            },
            {
                id: "emBirthday",
                header: "Д/Р",
                editView: bdEditView
            },
            {
                id: "img",
                header: "Фото",
                editView: imgEditView,
                readView: imgViewView
            }
        ],

        noEntriesMsg: "Не добавлено ни одного сотрудника. Let's do it!",
        loadingMsg: "Загружаются данные... Подождите...",
        allowCreate: isHr,
        allowEdit: isHr,
        allowReorder: false,
        allowDelete: isHr
    });


    acceptDate();
    $(AJS).on(AJS.RestfulTable.Events["EDIT_ROW"], function(){
        setTimeout(acceptDate, 300);
    });

}

function acceptDate(){
    AJS.$("input[name=emBirthday]").each(function(i,el){
        AJS.$(el).datePicker(
            {
                'overrideBrowserDefault': true,
                "dateFormat": "dd.mm.yy"
            });
    });
}

