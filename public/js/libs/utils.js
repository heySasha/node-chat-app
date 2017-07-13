const Utils = {
    deparam(uri) {
        if(uri === undefined){
            uri = window.location.search;
        }

        const queryString = {};
        uri.replace(
            new RegExp(
                "([^?=&]+)(=([^&#]*))?", "g"),
            function($0, $1, $2, $3) {
                queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
            }
        );
        return queryString;
    },

    str2DOMElement(html) {
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        document.body.appendChild(frame);
        frame.contentDocument.open();
        frame.contentDocument.write(html);
        frame.contentDocument.close();
        const el = frame.contentDocument.body.firstChild;
        document.body.removeChild(frame);
        return el;
    }
};

