
/**
 Handle the form submit, preventing the default behavior and formatting the search string
 */
$('form').submit(function(event) {
    $('.org-container').remove();
    event.preventDefault();
    var userName = $('.name-input').val();
    infoCall(userName);
});

/**
 Create a function to send the organization info request, sending the results to the organization details constructor
 */
function infoCall(userName) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.github.com/users/" + userName + "/orgs",
        "method": "GET",
        "processData": false,
        "data": "{}"
    };
    $.ajax(settings).done(function(response) {
        for (var org = 0; org < response.length; org++) {
            new OrgDetails(response[org]);
        }
    });
}

/**
 Create a constructor that will build our oranization badges
*/
function OrgDetails(orgObject) {
    this.info = {
        orgName: orgObject.login,
        orgLogo: orgObject.avatar_url
    };
    this.createElements = function() {
        var container = $('<div>').attr('class', 'org-container');
        var logo = $('<img>').attr('src', this.info.orgLogo).appendTo(container);
        var name = $('<h1>').html(this.info.orgName).appendTo(container);

        $(container).prependTo('.organizations-container').fadeIn();
    };
    this.createElements();
}
