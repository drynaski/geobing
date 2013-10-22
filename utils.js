exports.check = function check (obj, path) {
    if(obj === null || typeof path !== 'string') {
        return null;
    }
    
    path = path.split('.');

    var key, len = path.length;
    for(var i = 0; i < len; i++) {
        key = path[i];

        if(String(parseInt(key, 10)) === key) {
            key = parseInt(key, 10);
        }

        if(i === len - 1) {
            if(key in obj) {
                return obj[key];
            }
            return null;
        }

        if(!obj || !(key in obj)) {
            return null;
        }

        obj = obj[key];
    }

    return null;
};
