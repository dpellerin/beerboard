$(document).ready(function(){
    
    // Add Tap Button Click
    $("#btn-add-tap").click(function() {
        document.location = "/admin/taps/new";
    });

    // Remove Tap Button Click
    // Remove Coming Soon Button Click
    $(".btn-rem-tap").click(function(){ 
        let tapId = this.id.substr(this.id.lastIndexOf('-')+1);
        document.location = "/admin/taps/rem/"+tapId;
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

    // Coming Soon Beer Change
    $("select[id*='sel-coming']").change(function() {
        let comingId = this.id.substr(this.id.lastIndexOf('-')+1);
        let beerId = $(this).find(':selected').val()

        $.ajax({
            type: "PUT",
            url: "/admin/coming/"+comingId,
            data: { beerId: beerId }
        }).done(function() {
            let comingAlert = $("span[id='comingAlert-" + comingId + "']");
            comingAlert.show().delay(1000).fadeOut("slow");
        });
    });

    // Remove Coming Soon Button Click
    $(".btn-rem-coming").click(function(){ 
        let comingId = this.id.substr(this.id.lastIndexOf('-')+1);
        let row = $(this);

        $.ajax({
            type: "DELETE",
            url: "/admin/coming/"+comingId,
        }).done(function() {
            row.closest("tr").remove();
        });
    });

    // Add Coming Soon Button Click
    $("#btn-add-coming").click(function(){
        document.location = "/admin/coming/new";
    });

    // Add Beer Button Click
    $("#btn-add-beer").click(function(){
        document.location = "/admin/beers/new";
    });

    // Edit Beer Button Click
    $(".btn-edit-beer").click(function(){
        document.location = "/admin/beers/edit/" + this.id.substr(this.id.lastIndexOf('-')+1);
    });
});