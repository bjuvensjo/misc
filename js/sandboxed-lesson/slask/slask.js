var Papa = function() {
    that = {
        name: 'Bjuvensjö',
    };
    this.getName = function() {
        return Papa.prototype.getName.call(that);
    }; 
};

Papa.prototype.getName = function() {
    return this.name;
};

var papa = new Papa();
console.log(papa.getName());
