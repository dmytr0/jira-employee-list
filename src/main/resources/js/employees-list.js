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
                var b64 = inp.closest("form").find(".imgb64");
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
                        //'<input class="imgfile" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg">' +
                        '<label><img height="20px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAIhCAACIQgE+ZX7pAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAm1JREFUeNqVlLlvE1EQxp+TkMA/QWu58H0I+RIxkm1R2JUtWUJuLB+y3bmg8H1GdmF66MHAv0GXDokGGmhRuAIJEBMv37faZz2HLJBitG/nffObmZ33VvR6PXHRut2u/my329dms5koFAp3i8VifDqd6j5Vc9FMYZ1OZ3s8HguCfD7fEex9tVrdp497ZlBT2GQyEeVyed/hcHx3u92ay+WifavX6+G/QU1hpVLpDmA/CPN6vec0A3pSq9UiZlCzym47nc4TwFYEeTwejSah8H9FpaHLoGqFFsIqlUqUMADWMDy5XhnrX0wEOwb0FmMYu1EhsliGwyGnmbLb7RpalRVdatyjBonP0U1yMBisoeuWYVvxePxZJBI5jMViLwKBwJFR5UqBscoV96gJh8OHiUTiCWEbQAllJq75bZLJ5GNWC8iZAjyjj3vUUNvv9/8cilIlM22jfQuCnrItQJYKcEkf96ihVv1+Zgd7azQaiX8BqaH2f26KBC6MljeARssLUyAmvMOzpJxFfeIMMqa9VKYrK1xQQ638XGSQpQ+A2dRp8x3Te45gwn7Km8I1fdyTFcpC+E6WSKVSjzKZzAH+IjvqTyGbzd63Wq2aco/1NX3cU28JY8kA66GgAH+SL81m87p6BCDaTafTD0Kh0MtoNPqKxjV93JMdMYaxYBzbbDZN4LQvIXyNbPo5pIBiruVZU40+eV6p5ZqxYLzhzRGcmt/v/9hoNG4i416r1dpDBfoTdoPV8Kdq2C59qoYxjAXjE4sTuVyuinI/w/EBWd4Gg8F3VzHGMJYt5/P5e2I+nwsscqCfGhf+SmbEnJJB1m+us2D7E+JjkwAAAABJRU5ErkJggg=="><input class="imgfile" style="display:none" type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg"></label>'+
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
                header: AJS.$("#employee-department").text()
            },

            {
                id: "emName",
                header: AJS.$("#employee-name").text()
            },

            {
                id: "emPosition",
                header: AJS.$("#employee-position").text()
            },

            {
                id: "emInPhone",
                header: AJS.$("#employee-in-phone").text()
            },
            {
                id: "emExtPhone",
                header: AJS.$("#employee-ext-phone").text()
            },
            {
                id: "emEmail",
                header: AJS.$("#employee-email").text()
            },
            {
                id: "emBirthday",
                header: AJS.$("#employee-birthday").text(),
                editView: bdEditView
            },
            {
                id: "img",
                header: AJS.$("#employee-photo").text(),
                editView: imgEditView,
                readView: imgViewView
            }
        ],

        noEntriesMsg: AJS.$("#employee-no-users").text(),
        loadingMsg: AJS.$("#employee-loading").text(),
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

