
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
    head.removeChile(cssStyle);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        // add_reactions_css(
        //     "https://raw.githubusercontent.com/FGrante/trump-reactions/master/img/trump-reactions.png",
        //     "https://raw.githubusercontent.com/FGrante/trump-reactions/master/img/trump-reactions%402x.png"
        // );
        if (reaction_css) {
            remove_reactions_css(reaction_css);
        }
        add_reactions_css(request.small_url, request.large_url);
    }
);