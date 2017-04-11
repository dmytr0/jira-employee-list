var isHr = false;
AJS.$(document).ready(function(){


    whoLoggined();


});

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
        var $img = AJS.$('<input class="imgfile" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg">'+
                         '<input class="imgb64" name="'+self.name+'" style="display: none" type="text" value="' + self.value + '">'
        );

        return $img;
    }
});


var imgViewView = AJS.RestfulTable.CustomReadView.extend({
    render: function (self) {
        var $img;
        if(self.value.length > 10) {
            $img = AJS.$('<input class="imgfile" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg">' +
                '<input class="imgb64" name="' + self.name + '" style="display: none" type="text" value="' + self.value + '">');

        }else {
            $img = AJS.$('<input class="imgfile" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg">' +
                '<input class="imgb64" name="' + self.name + '" style="display: none" type="text" value="' + self.value + '">');
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
                editView: imgEditView
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

