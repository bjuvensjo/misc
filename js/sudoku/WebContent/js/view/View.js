define(
        [ 'jquery', './Clock', './Model' ],
        function ($, Clock, Model) {
            // console.dir($mobile);
            // console.dir($ui);
            var View = null;
            View = function (model) {
                if (!(this instanceof View)) {
                    return new View();
                }
                this.model = model;
                this.clock = new Clock();
            };
            View.prototype.initialize = function () {
                var that = this;
                (function ($) {
                    var clockInterval = null, formatNotes, methods, $selectedNumber = null, selectedNumber = null, selectNumber, writeNumber, toggleNumberNotes, notes = false;
                    formatNotes = function (set) {
                        var formatedNotes, i, sortedArray;
                        formatedNotes = '';
                        if (set) {
                            sortedArray = set.asArray().sort();
                            for (i = 0; i < sortedArray.length; i++) {
                                if (i > 0) {
                                    formatedNotes += ' ';
                                }
                                formatedNotes += sortedArray[i];
                            }
                        } else {
                            formatedNotes += '&nbsp;';
                        }
                        return formatedNotes;
                    };
                    selectNumber = function () {
                        if ($selectedNumber) {
                            $selectedNumber.removeClass('selected-number');
                        }
                        $selectedNumber = $(this);
                        selectedNumber = parseInt($selectedNumber.html());
                        $selectedNumber.addClass('selected-number');
                    };
                    writeNumber = function ($sudoku) {
                        var $this = $(this), $modelIndex, i, modelIndex, modelIndexes, set;
                        if ($selectedNumber) {
                            modelIndex = parseInt($this.attr('id'));
                            if (notes) {
                                if (!($this.hasClass('notes'))) {
                                    $this.addClass('notes');
                                }
                                set = that.model.updateNote(modelIndex, selectedNumber);
                                that.model.save();
                                $this.html(formatNotes(set));
                            } else {
                                if (that.model.updateSudoku(modelIndex, selectedNumber)) {
                                    $this.off('click');
                                    $this.removeClass('notes');
                                    $this.html(selectedNumber);
                                    modelIndexes = that.model.removeNotes(modelIndex, selectedNumber);
                                    that.model.save();
                                    for (i = 0; i < modelIndexes.length; i++) {
                                        $modelIndex = $('#' + modelIndexes[i]);
                                        if ($modelIndex.hasClass('notes')) {
                                            $modelIndex.html(formatNotes(that.model.getNotes()[modelIndexes[i]]));
                                        }
                                    }
                                    if (that.model.isSolved()) {
                                        that.clock.stop();
                                        $sudoku.addClass('sudoku-solved');
                                    }
                                } else {
                                    $this.addClass('error');
                                    setTimeout(function () {
                                        $this.removeClass('error');
                                    }, 300);
                                }
                                that.model.save();
                                $('#errors').html(that.model.getErrors() || '');
                            }
                        }
                    };
                    toggleNumberNotes = function () {
                        notes = !notes;
                        $(this).toggleClass('notes-toggle');
                        $(this).html(notes ? 'N' : 'V');
                    };
                    methods = {
                        sudoku : function () {
                            var $sudoku = $('<table class="sudoku"></table'), $row, $column, r, c, box;
                            box = function (boxRow, boxColumn) {
                                var $box = $('<table class="box"></table'), $row, $column, modelIndex, r, c, getModelIndex;
                                getModelIndex = function (boxRow, boxColumn, row, column) {
                                    var theRow, theColumn;
                                    theRow = boxRow * 3 + row;
                                    theColumn = boxColumn * 3 + column;
                                    return theRow * 9 + theColumn;
                                };
                                for (r = 0; r < 3; r++) {
                                    $row = $('<tr></tr>');
                                    $box.append($row);
                                    for (c = 0; c < 3; c++) {
                                        $column = $('<td class="square"></td>');
                                        modelIndex = getModelIndex(boxRow, boxColumn, r, c);
                                        $column.attr('id', modelIndex);
                                        $row.append($column);
                                    }
                                }
                                return $box;
                            };
                            for (r = 0; r < 3; r++) {
                                $row = $('<tr></tr>');
                                $sudoku.append($row);
                                for (c = 0; c < 3; c++) {
                                    $column = $('<td></td>');
                                    $column.append(box(r, c));
                                    $row.append($column);
                                }
                            }
                            this.append($sudoku);
                            return this;
                        },
                        clock : function () {
                            var $clock = $('<div id="clock"></div>');
                            this.append($clock);
                            return this;
                        },
                        help : function () {
                            var $square, modelIndex, notes, value;
                            notes = that.model.createNotes();
                            that.model.save();
                            $.each($('.square'), function (index, html) {
                                $square = $(html);
                                modelIndex = parseInt($square.attr('id'));
                                value = notes[modelIndex];
                                if (value) {
                                    if (!($square.hasClass('notes'))) {
                                        $square.addClass('notes');
                                    }
                                    $square.html(formatNotes(value));
                                }
                            });
                        },
                        numbers : function () {
                            var number, $navbar, $navbarInner, $container, $a;
                            $navbar = $('<div class="navbar"></div>');
                            $navbarInner = $('<div class="navbar-inner"></div>');
                            $container = $('<div class="container"></div>');
                            $navbar.append($navbarInner);
                            $navbarInner.append($container);
                            for (number = 1; number < 10; number++) {
                                $a = $('<a class="btn number" href="#">' + number + '</a>');
                                $container.append($a);
                                $a.click(selectNumber);
                            }
                            $a = $('<a class="btn number" style="float:right;" href="#">' + 'V' + '</a>');
                            $container.append($a);
                            $a.click(toggleNumberNotes);
                            this.append($navbar);
                            return this;
                        },
                        start : function (createNew) {
                            var $square, $sudoku, modelIndex, notes, squareNotes, sudoku, value;
                            $sudoku = this;
                            // TODO Refactor!
                            var updateSudoku = function () {
                                sudoku = that.model.getSudoku();
                                notes = that.model.getNotes();
                                if (sudoku) {
                                    $.each($('.square'), function (index, html) {
                                        $square = $(html);
                                        modelIndex = parseInt($square.attr('id'));
                                        value = sudoku[modelIndex];
                                        $square.off('click');
                                        if (value === 0) {
                                            $square.click(function (e) {
                                                writeNumber.call(e.target, $sudoku);
                                            });
                                            $square.removeClass('model-value');
                                            squareNotes = notes[modelIndex];
                                            if (squareNotes) {
                                                value = formatNotes(squareNotes);
                                                $square.addClass('notes');
                                            } else {
                                                value = '&nbsp;';
                                            }
                                        } else {
                                            $square.removeClass('notes');
                                            $square.addClass('model-value');
                                        }
                                        $square.html(value);
                                    });
                                    that.clock.start(createNew);
                                    // TODO Move below to appropriate place...
                                    if (clockInterval) {
                                        clearInterval(clockInterval);
                                    }
                                    var updateClock = function () {
                                        var s, time;
                                        s = '';
                                        that.clock.update();
                                        time = that.clock.getTime();
                                        if (time.hours < 10) {
                                            s += '0';
                                        }
                                        s += time.hours;
                                        s += ':';
                                        if (time.minutes < 10) {
                                            s += '0';
                                        }
                                        s += time.minutes;
                                        s += ':';
                                        if (time.seconds < 10) {
                                            s += '0';
                                        }
                                        s += time.seconds;
                                        $('#clock').html(s);
                                    };
                                    updateClock();
                                    clockInterval = setInterval(function () {
                                        updateClock();
                                    }, 1000);
                                }
                                $('#loader').hide();
                                $sudoku.removeClass('sudoku-solved');
                                $('#errors').html(that.model.getErrors() || '');
                            };
                            $('#loader').show();
                            if (createNew) {
                                if (typeof (Worker) !== "undefined") {
                                    var worker = new Worker('js/initializeWorker.js');
                                    // receive messages from web worker
                                    worker.onmessage = function (e) {
                                        that.model.cells = e.data.cells;
                                        that.model.errors = e.data.errors;
                                        that.model.notes = e.data.notes;
                                        that.model.remaining = e.data.remaining;
                                        that.model.sudoku = e.data.sudoku;
                                        that.model.save();
                                        updateSudoku();
                                    };
                                    // send message to web worker
                                    worker.postMessage('createNew');
                                } else {
                                    that.model = new Model();
                                    that.model.initialize();
                                    that.model.save();
                                    updateSudoku();
                                }
                            } else {
                                that.model.load();
                                updateSudoku();
                            }
                        }
                    };

                    $.fn.sudoku = function (method) {
                        // Method calling logic
                        if (methods[method]) {
                            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
                        } else if (typeof method === 'object' || !method) {
                            return methods.sudoku.apply(this, arguments);
                        } else {
                            $.error('Method ' + method + ' does not exist on jQuery.sudoku');
                        }
                    };
                })(jQuery);
                $(function () {
                    var $sudoku = $('#sudoku');
                    $sudoku.sudoku();
                    $sudoku.sudoku('numbers');
                    // $sudoku.sudoku('clock');
                    $sudoku.sudoku('start', false);
                    $('#new').click(function () {
                        $sudoku.sudoku('start', true);
                    });
                    $('#help').click(function () {
                        $sudoku.sudoku('help');
                    });
                    $sudoku.show();
                });
            };
            return View;
        });
