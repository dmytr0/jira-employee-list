var rowTemplate =
    '<td class="emdata emdep"><%= emDep %></td>' +
    '<td class="emdata emName"><%= emName %></td>' +
    '<td class="emdata emPosition"><%= emPosition %></td>' +
    '<td class="emdata emInPhone"><a href="tel:<%= emInPhone %>"><%= emInPhone %></a></td>' +
    '<td class="emdata emExtPhone"><a href="tel:<%= emExtPhone %>"><%= emExtPhone %></a></td>' +
    '<td class="emdata emEmail"><a href="mailto:<%= emEmail %>"><%= emEmail %></a></td>' +
    '<td class="emdata emBirthday"><%= emBirthday %></td>'+
    '<td class="emdata bdicon"></td>';

var EmployeeModel = Backbone.Model.extend({
    defaults: {
        emDep: "undef",
        emName: "undef",
        emInPhone: "undef",
        emExtPhone: "undef",
        emEmail: "undef",
        emBirthday: "undef",
        emPosition: "undef"
    }
});

var EmployeeView = Backbone.View.extend({

  template: _.template(rowTemplate),
  tagName: 'tr',
  className: 'employee-item',

  render: function(){
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
  }

});

var EmployeesCollection = Backbone.Collection.extend({
  url: AJS.contextPath() + '/rest/employee/1/em',
  model: EmployeeModel

});


var EmployeesView = Backbone.View.extend({
  tagName: 'tbody',


  render: function() {
  		this.collection.each(function(employee) {
  			var employeeView = new EmployeeView({model: employee});
  			this.$el.append(employeeView.render().el);
  		}, this);

  		return this;
  	}

});


var collectionMain = new EmployeesCollection();

function checkBirthday() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var todayEnd = new Date(today.valueOf() + 86399999);

    var low = new Date(today.valueOf() - 432000000);
    var high = new Date(todayEnd.valueOf() + 432000000);

    var month = now.getMonth()+1;
    var day = now.getDate();

    var arr = AJS.$("#employees-table tbody tr");
    arr.each(function(i, el){
        el = AJS.$(el);
        var bd = el.find(".emBirthday").text().split(".");
        var reqBD = new Date(now.getFullYear(), bd[1]-1 ,bd[0]);

        if(parseInt(bd[1]) === month){
            if(parseInt(bd[0]) == day){
                el.find('.bdicon').html("<img class='bdimg'  src='data:image/png;base64,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'>");

                el.addClass("bd-now");
            }

        }



        if( reqBD >= low && reqBD < today ){
            el.addClass("bd-ended");
        }
        if(reqBD > todayEnd && reqBD <= high){
            el.addClass("bd-soon");
        }



    });
}

var App = Backbone.View.extend({

    initialize: function() {
        console.log("init app view");
        this.listenTo(collectionMain, 'reset', this.render);
        collectionMain.fetch({reset: true});
    },

    render: function(){
        AJS.$('#employees-table tbody').remove();
        var employeesV = new EmployeesView({collection: collectionMain });
        var html = employeesV.render().el;
        AJS.$('#employees-table').append(html);

        try {
            AJS.tablessortable.setTableSortable(AJS.$("#employees-table"));

            checkBirthday();
        }
        catch (e){
            console.log(e);
        }

        return this;
    }

});


AJS.$(document).ready(function(){
    new App();
    window.onbeforeunload = null;
    AJS.$("#employee-filter").on("input", doFilter);
});

function doFilter(){
    try {
        var required = AJS.$(this).val().trim().toLowerCase();
        var arr = AJS.$("#employees-table tbody tr");

        if (required == undefined || required.length === 0) {
            arr.each(function (i, el) {
                AJS.$(el).show();
            });
        }

        arr.each(function (i, el) {
            el = AJS.$(el);
            var fact = el.text().toLowerCase();

            if (fact.indexOf(required) >= 0 || fact.indexOf(convertLayout(required)) >= 0 ) {
                el.show();
            } else {
                el.hide();
            }

        });
    }
    catch (e){
        console.log(e);
    }

}

function convertLayout (str){
    replacer = {
        "q":"й", "w":"ц"  , "e":"у" , "r":"к" , "t":"е", "y":"н", "u":"г",
        "i":"ш", "o":"щ", "p":"з" , "[":"х" , "]":"ъ", "a":"ф", "s":"ы",
        "d":"в" , "f":"а"  , "g":"п" , "h":"р" , "j":"о", "k":"л", "l":"д",
        ";":"ж" , "'":"э"  , "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и",
        "n":"т" , "m":"ь"  , ",":"б" , ".":"ю" , "/":"."
    };

    for(i=0; i < str.length; i++){
        if( replacer[ str[i].toLowerCase() ] != undefined){

            if(str[i] == str[i].toLowerCase()){
                replace = replacer[ str[i].toLowerCase() ];
            } else if(str[i] == str[i].toUpperCase()){
                replace = replacer[ str[i].toLowerCase() ].toUpperCase();
            }

            str = str.replace(str[i], replace);
        }
    }

    return str;
}
