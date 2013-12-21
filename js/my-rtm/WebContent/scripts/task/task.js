define([ "date", "task/labels" ],  function(dateModule, labelsModule) {
    var id = 0, extract, parse;

    extract = function(value, pattern, sign) {
        var match = value.match(pattern), rest = value.replace(pattern, ''), index;
        if (match) {
            for (index = 0; index < match.length; index++) {
                match[index] = match[index].replace(sign, '');
            }
        }
        return [ rest, match || null ];
    };
    
    parse = function(value) {
        var name, due, labels, priority, rest;

        rest = extract(value, /\^([1-9 ]*[^!# ]+)/g, '\^');
        due = rest[1] ? dateModule.parse(rest[1][0]) : dateModule.today();

        rest = extract(rest[0], /#[^\^! ]+/g, '#');
        labels = rest[1] ? labelsModule.get(rest[1]) : '';
        
        rest = extract(rest[0], /!([^\^# ]+)/g, '!');
        priority = rest[1] ? rest[1][0] : '100';

        name = rest[0].trim();

        return {
            name : name,
            due : due,
            labels : labels,
            priority : priority
        };
    };

    // name, due, labels, priority
    // or a string of the form 'name ^due #label #label !priority
    return function() {
        var spec, uniqueId;

        uniqueId = (function() {
            var time = new Date().getTime();
            id = (id + 1) % 10000;
            return time + '-' + id;
        }());

        if (arguments.length === 4) {
            spec = {
                name : arguments[0],
                due : arguments[1],
                labels : arguments[2],
                priority : arguments[3]
            };
        } else {
            spec = parse(arguments[0]);
        };
        spec.id = uniqueId;

        // TODO Implement labels, priority as singletons
        // TODO Implement due correctly!
        return {
            id : spec.id,
            name : spec.name,
            due : spec.due,
            labels : spec.labels,
            priority : spec.priority,
        };
    };
});
