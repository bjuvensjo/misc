define(function() {
    var storage = {}, fromString, toString;
    
    // TODO Move these functions and pass them as parameters
    fromString = function(item) {
        //return json.parse(item, true);
        var index = 0, task = {}, properties = item.split('#'), keyValue;
        for (index = 0; index < properties.length; index++) {
            keyValue = properties[index].split('=');
            if (keyValue[0] === 'due') {
                task[keyValue[0]] = new Date(keyValue[1]);
            } else {
                task[keyValue[0]] = keyValue[1];
            }            
        };
        return task;
    };
    
    toString = function(task) {
        //return json.stringify(task);
        var name = item = '', value;
        for (name in task) {
            if (item) {
                item += '#';
            }
            if (name === 'due') {
                value = task[name].toDateString();
            } else {
                value = task[name];
            }
            item += (name + '=' + value);
        }
        return item;
    };
    
    storage.clear = function() {
        localStorage.clear();
    };
    
    storage.load = function() {
        var n, key, item, task, tasks = [];
        for (n = 0; n < localStorage.length; n++) {
            key = localStorage.key(n);
            item = localStorage.getItem(key);
            task = fromString(item);
            tasks.push(task);
        }
        return tasks;
    };
    
    storage.store = function(task) {
        var item = toString(task);
        localStorage.setItem(task.id, item);
    };

    return storage;
});
