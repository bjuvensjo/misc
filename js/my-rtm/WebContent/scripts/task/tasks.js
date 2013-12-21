define([ "task/task" ], function(task) {
    var tasks = [], add, addAll, get, remove, sort, index;

    // name, due, labels, priority
    // a string of the form 'name ^due #label #label !priority
    add = function() {
        var theTask = task.apply(null, arguments);
        tasks.push(theTask);
        return theTask;
    };
    
    addAll = function(theTasks) {
        for (index = 0; index < theTasks.length; index++) {
            tasks.push(theTasks[index]);
        };        
    };
    
    get = function(id) {
        var item;
        for (index = 0; index < tasks.length; index++) {
            item = tasks[index];
            if (id === item.id) {
                return item;
            };
        };
        return null;        
    };

    remove = function(id) {
        var item;
        for (index = 0; index < tasks.length; index++) {
            item = tasks[index];
            if (id === item.id) {
                tasks.splice(index, 1);
                return true;
            };
        };
        return false;
    };

    sort = function(f) {
        tasks.sort(f);
        return tasks;
    };

    return {
        add : add,
        addAll: addAll,
        get: get,
        remove : remove,
        sort : sort
    };
});
