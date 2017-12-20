$(document).ready(function(){
    // Edit Beer Button Click
    $(".btn-edit-beer").click(function(){
        document.location = "/admin/edit_beer/" + this.id.substr(this.id.lastIndexOf('-')+1);
    });

    // Tap Beer Change
    $("select[id*='sel-tap']").change(function() {
        let tapId = this.id.substr(this.id.lastIndexOf('-')+1);
        let beerId = $(this).find(':selected').val()

        $.ajax({
            type: "POST",
            url: "/admin/save_tap",
            data: { tapId: tapId, beerId: beerId }
        }).done(function() {
            let tapAlert = $("span[id='alert-" + tapId + "']");
            tapAlert.show().delay(1000).fadeOut("slow");
        });
    });
});