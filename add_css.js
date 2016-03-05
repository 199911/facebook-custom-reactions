
var head = document.getElementsByTagName("head")[0];
var reaction_css = undefined;

var add_reactions_css = function(small_url, large_url) {
    var cssStyle = document.createElement('style');
    cssStyle.type = 'text/css';
    var small_reaction = '.x2 ._iuz {background-image: url("'+small_url+'") !important;}';
    var large_reaction = '._iuz {background-image: url("'+large_url+'") !important;}';
    var cssRules = document.createTextNode(small_reaction + large_reaction);
    cssStyle.appendChild(cssRules);
    head.appendChild(cssStyle);
    return cssStyle;
};
var remove_reactions_css = function(cssStyle) {
    head.removeChild(cssStyle);
    return undefined;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.action === 'set') {
            if (reaction_css) {
                reaction_css = remove_reactions_css(reaction_css);
            }
            reaction_css = add_reactions_css(request.url, request.url);
            // store the options
            localStorage.setItem("url", request.url);
        } else if (request.action === 'remove') {
            if (reaction_css) {
                reaction_css = remove_reactions_css(reaction_css);
            }
            localStorage.removeItem("url");
        } else {
            console.log('unknown action:' + JSON.stringify(request));
        }
    }
);

var default_url = localStorage.getItem("url");
if ( default_url ){
    reaction_css = add_reactions_css(default_url,default_url);
}
