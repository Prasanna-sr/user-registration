$(document).ready(function() {
    console.log('page ready');
    var hash = window.location.hash;
    if (hash === '#home') {
        showHome();
    } else if (hash === '#signup') {
        showSignup();
    } else if (hash === "#login") {
        showLogin();
    } else {
        showLogin();
    }

    function showSignup() {
        window.location.hash = 'signup';
        $(".login").hide();
        $(".home").hide();
        $("#btn-signout").hide();
        $(".signup").show();
    }

    function showHome() {
        window.location.hash = 'home';
        $.ajax({
            method: 'GET',
            url: 'api/user'
        }).done(function(objData) {
            console.log("get user success");
            $(".signup").hide();
            $(".login").hide();
            $("#btn-signout").show();
            $(".home").show();
            console.log(objData);
            if (objData) {
                $('.lblName').text(objData.name);
                $('.lblCity').text(objData.city);
            }

        }).fail(function(data) {
            showLogin();
        });

    }

    function showLogin() {
        window.location.hash = '#';
        $(".home").hide();
        $(".signup").hide();
        $("#btn-signout").hide();
        $(".login").show();
    }

    $('#btn-signout').click(function() {
        $.ajax({
            method: 'GET',
            url: 'api/logout'
        }).done(function(data) {
            console.log("signout success");
            showLogin();
        });
    });

    $('#btnSignin').click(function() {
        var dataObj = {
            emailid: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        };
        $.ajax({
            method: 'POST',
            url: 'api/login',
            accepts: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(dataObj),
            dataType: 'json'
        }).done(function(data) {
            console.log("login success");
            showHome();
        }).fail(function(err) {
            console.log("login failed");
            console.log(err);
            alert("login failed !");
        })
    });

    $('#btn-signup').click(function() {
        showSignup();
    });

    $('#btn-submit').click(function() {
        var dataObj = {
            "emailid": $('#inputEmail').val(),
            "password": $('#inputPassword').val(),
            "name": $('#inputName').val(),
            "city": $('#inputCity').val()
        };
        $.ajax({
                method: 'POST',
                url: 'api/user',
                contentType: 'application/json',
                data: JSON.stringify(dataObj),
                dataType: 'json',
            }).done(function(data) {
                console.log('sign up success');
                showHome();
            })
            .fail(function(data) {
                alert("signup failed");
            });
    });
});
