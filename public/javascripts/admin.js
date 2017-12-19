$(document).ready(function(){
    $(".btn-edit-beer").click(function(){
        document.location = "/admin/edit_beer/" + this.id.substr(this.id.lastIndexOf('-')+1);
    });
});