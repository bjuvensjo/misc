require([ "jquery", "date", "task/labels", "task/storage", "task/tasks", "domReady!" ], function($, date, labels, storage, tasks) {
    var addInput = $('#addInput'), add;

    //storage.clear();

    addInput.bind('keyup', function(evt) {
        var value = addInput.val();
        if (evt.keyCode === 13) {
            if (value !== '') {
                add(value);
            }
        }
    });
    
    addInput.autocomplete({
        // TODO: Implement correctly!
        source: function(request, responseCallback) {
            var term = request.term, allLabels, index, response;
            if ('^' === term.charAt(term.length - 1)) {
                response = [ { label: 'today', value: term + 'today ' }, { label: 'tomorrow', value: term + 'tomorrow ' } ];
            } else if ('!' === term.charAt(term.length - 1)) {
                response = [ { label: '1', value: term + '1 ' }, { label: '2', value: term + '2 ' }, { label: '3', value: term + '3 ' } ];
            } else if ('#' === term.charAt(term.length - 1)) {
                allLabels = ['bar', 'evry', 'foo'];//labels.getAll();     
                if (allLabels) {
                    response = [];
                    for (index = 0; index < allLabels.length; index++) {
                        response.push({label: allLabels[index], value: term + allLabels[index] + ' '});
                    }
                }
            }
            if (response) {
                responseCallback(response);
            }
        }
    });
    
    add = function(value) {
        var task, taskDiv, ul;
        if (typeof value === 'string') {
            task = tasks.add(value);
            storage.store(task);
        } else {
            task = value;
        }
        addInput.val('');
        taskDiv = $('<div>').addClass('taskDiv');
        ul = $('<ul>').addClass('task');
        ul.append($('<li>').addClass('id').html(task.id));
        ul.append($('<li>').addClass('check').append($('<input>').attr('type', 'checkbox')));
        ul.append($('<li>').addClass('priority ' + 'priority' + (task.priority || '0')));
        ul.append($('<li>').addClass('labels').html(task.labels.toString()));
        ul.append($('<li>').addClass('name').html(task.name));
        //ul.append($('<li>').addClass('due').html(task.due.toLocaleDateString()));
        ul.append($('<li>').addClass('due').html(task.due.toString("dddd d MMM")));
        taskDiv.append(ul);
        
        $('.taskDiv').each(function(index) {
            var id = $('.id', this).html(), currentTask, compare;
            currentTask = tasks.get(id);
            compare = function(x, y) {
                return x.due - y.due || x.priority - y.priority || x.name.localeCompare(y.name);
            };
            if (compare(currentTask, task) > 0) {
                taskDiv.insertBefore($(this));
                taskDiv = null;
                return false;
            }
        });
        if (taskDiv) {
            $('#tasksDiv').append(taskDiv);
        }
    };

    (function(theTasks) {
        var index;
        tasks.addAll(theTasks);
        for (index = 0; theTasks && index < theTasks.length; index++) {
            add(theTasks[index]);
        }
    }(storage.load()));
});
