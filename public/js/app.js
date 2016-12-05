$(document).foundation();

//HAMBURGER

$('.ham-btn').click(function() {
    $('.ham-wrapper').animate({width: "200px"}, 200);
    $('.ham-close').css("display", "block");
});

$('.ham-close').click(function() {
    $('.ham-close').css("display","none");
    $('.ham-wrapper').animate({width: "0px"}, 200);
});

$('body').click(function() {
    var toggle = $('.ham-wrapper').width();
    if(toggle > 0){
        $('.ham-wrapper').animate({width: "0px"}, 200);
        $('.ham-close').css("display","none");

    }
});

//cookie service

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


//Register Modal

$('.register-pop-up').click(function(){
  $('.wrapper-form').css('display','block');
});

// popus window for login

var profiles =
{
    windowCallUnload:
    {
        // height:300,
        // width:400,
        center:1,
        onUnload:unloadcallback
    }
};


function logOut(){
    $.post( "/user/logout")
    .done(function( data ) {
        if(data.response){
            location.reload();
        }
    });
}

function unloadcallback(){
    console.log("asdasdasda");
    if(localStorage.temptoken !== undefined){
        $.post( "/user/user_validate", { "token" : localStorage.temptoken })
        .done(function( data ) {
            if(!data.response){
                $('.close-button').trigger('click'); // old form
                $('.holax').trigger('click'); // register form
                $('.reg-social').css("display","none"); // register btn with fb and google
                $('.user-name').val(data.name);
                $('.email').val(data.email);
            }
            else{
                $('.close-button').trigger('click');
                $('.close-button').trigger('click');
                location.reload();
            }
        });
    }
};

function registerUserComplete(){
    userDetails = getUserDetails();
    if(userDetails.name === "" || userDetails.gender === undefined || userDetails.phoneNumber === "" || userDetails.email === "" || userDetails.college === "" || userDetails.year === undefined || userDetails.city === "" || userDetails.accomodation === undefined)
        return;
    reqBody = { "token" : localStorage.temptoken, "user" : getUserDetails() };
    formSubmission("/user/user_register_complete", reqBody)
}

function formSubmission(url,reqBody ){
    $.post( url, reqBody)
    .done(function( data ) {
        if(data.response){
            $('.close-button').trigger('click');
            notifDisplay(1,1);
            location.reload();
        }else{
            notifDisplay(0,0);
        }
    });
}


$(function()
{
    $(".popupwindow").popupwindow(profiles);
});


// Reg Form Object

function getUserDetails(){
    userDetail ={
        name : $('.user-name').val(),
        gender : $('input:radio[name=gender]:checked').val(),
        phoneNumber : $('.phone').val(),
        email : $('.email').val(),
        college : $('.college').val(),
        year : $('input:radio[name=year]:checked').val(),
        city : $('.city').val(),
        accomodation : $('input:radio[name=acc]:checked').val()
    }
    return userDetail;
}

function validateUserDetails(data){
    if(data.name === "" || data.gender === undefined || data.phoneNumber === "" || data.email === "" || data.college === "" || data.year === undefined || data.city === "" || data.accomodation === undefined)
        return false;
    else
        return true;
}

function notifDisplay(status, icon){
    var regMsg = ["Your registration is not successfull !", "Your registration is successfull !", "Payment will be open soon", "Payment successfull !", "Payment unsuccessfull !"]
    var regIcon = ['<i class="fa fa-times" aria-hidden="true"></i>', '<i class="fa fa-check" aria-hidden="true"></i>']
    $(".reg-status-img").html(regIcon[status]);
    $(".reg-status").html(regMsg[icon]);
    $(".notif").css('display','block').delay(3000).fadeOut();
}

$('.nav-usr-name').mouseover(function() {
    $('.profile-drop-down').css('display','block');
});
$('.nav-usr-name').mouseout(function() {
    $('.profile-drop-down').css('display','none');
});
$('.profile-drop-down').mouseover(function() {
    $('.profile-drop-down').css('display','block');
});
$('.profile-drop-down').mouseout(function() {
    $('.profile-drop-down').css('display','none');
});
