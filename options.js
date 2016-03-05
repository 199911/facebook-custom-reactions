function send(data) {
    console.log(data);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    var submit_btn = document.getElementById('set-btn');
    submit_btn.addEventListener('click', function(e){
        event.preventDefault();
        var data = {
            "action" : "set"
        };
        var inputs = document.querySelectorAll('input[name]')
        for ( var i = 0; i < inputs.length; ++i ){
            var element = inputs[i];
            data[element.getAttribute('name')] = element.value;
        }
        send(data);
    });
    var reset_btn = document.getElementById('reset-btn');
    reset_btn.addEventListener('click', function(e){
        send({
            "action" : "remove"
        });
    });
});