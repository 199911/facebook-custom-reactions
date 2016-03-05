function send(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    var submit_btn = document.querySelector('input[type="submit"]');
    submit_btn.addEventListener('click', function(e){
        event.preventDefault();
        var data = {};
        var inputs = document.querySelectorAll('input[name]')
        for ( var i = 0; i < inputs.length; ++i ){
            var element = inputs[i];
            data[element.getAttribute('name')] = element.getAttribute('value');
        }
        console.log( data );
        send(data);
    });
});