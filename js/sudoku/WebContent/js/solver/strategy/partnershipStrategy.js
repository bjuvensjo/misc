define(
        [ '../../util/combination', '../../util/index', '../../util/BitSet' ],
        function (combinationUtil, indexUtil, Set) {
            var PartnershipStrategy = null;

            PartnershipStrategy = function () {
                if (!(this instanceof PartnershipStrategy)) {
                    return new PartnershipStrategy();
                }
                var i, indexes;
                // boxes
                this.boxIndexes = [];
                indexes = [ 0, 3, 6, 27, 30, 33, 54, 57, 60 ];
                for (i = 0; i < indexes.length; i++) {
                    this.boxIndexes.push(indexUtil.getBoxIndexes(indexes[i]));
                }
                // columns
                this.columnIndexes = [];
                indexes = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ];
                for (i = 0; i < indexes.length; i++) {
                    this.columnIndexes.push(indexUtil.getColumnIndexes(indexes[i]));
                }
                // rows
                this.rowIndexes = [];
                indexes = [ 0, 9, 18, 27, 36, 45, 54, 63, 72 ];
                for (i = 0; i < indexes.length; i++) {
                    this.rowIndexes.push(indexUtil.getRowIndexes(indexes[i]));
                }
            };
            // TODO How about "fylla rutan"(see book "SUDOKU EXTREME")
            PartnershipStrategy.prototype.apply = function (cells, notes) {
                var handle, i, updated;

                handle = function (cells, notes, indexes) {
                    var cellNotes, cellNotesContainsAllCombination, cellNotesNotContainsAllCombination, combination, combinationSet, combinationNotContainsAllCellNotes, countCombinationContainingNotes, countNotesContainingCombination, countNotesContainingSomeCombinationValue, i, j, k, n, notesValues, possibleNotesCombinations, result;
                    result = [];

                    notesValues = new Set([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
                    for (i = 0; i < indexes.length; i++) {
                        notesValues.remove(cells[indexes[i]]);
                    }

                    // TODO Is below > 2 correct?
                    if (notesValues.getSize() > 2) {
                        notesValues = notesValues.asArray();
                        for (n = 2; n < notesValues.length; n++) {
                            possibleNotesCombinations = combinationUtil.getCombinations(notesValues, n);
                            for (i = 0; i < possibleNotesCombinations.length; i++) {
                                combination = possibleNotesCombinations[i];
                                combinationSet = new Set(combination);
                                countNotesContainingCombination = 0;
                                countNotesContainingSomeCombinationValue = 0;
                                countCombinationContainingNotes = 0;
                                cellNotesContainsAllCombination = [];
                                cellNotesNotContainsAllCombination = [];
                                combinationNotContainsAllCellNotes = [];
                                for (j = 0; j < indexes.length; j++) {
                                    cellNotes = notes.getValue(indexes[j]);
                                    if (cellNotes !== null) {
                                        if (countNotesContainingSomeCombinationValue === 0) { // performance
                                                                                                // reasons
                                            if (cellNotes.containsAll(combinationSet)) {
                                                countNotesContainingCombination++;
                                                cellNotesContainsAllCombination.push(indexes[j]);
                                            } else {
                                                cellNotesNotContainsAllCombination.push(indexes[j]);
                                                for (k = 0; k < combination.length; k++) {
                                                    if (cellNotes.contains(combination[k])) {
                                                        countNotesContainingSomeCombinationValue++;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        if (combinationSet.containsAll(cellNotes)) {
                                            countCombinationContainingNotes++;
                                        } else {
                                            combinationNotContainsAllCellNotes.push(indexes[j]);
                                        }
                                    }
                                }
                                if (countNotesContainingCombination === n && countNotesContainingSomeCombinationValue === 0) {
                                    for (j = 0; j < cellNotesContainsAllCombination.length; j++) {
                                        cellNotes = notes.getValue(cellNotesContainsAllCombination[j]);
                                        if (cellNotes.getSize() - combination.length) {
                                            result.push(cellNotesContainsAllCombination[j]);
                                        }
                                        cellNotes.clear();
                                        cellNotes.addAll(combination);
                                    }
                                    for (j = 0; j < cellNotesNotContainsAllCombination.length; j++) {
                                        cellNotes = notes.getValue(cellNotesNotContainsAllCombination[j]);
                                        if (cellNotes.removeAll(combination)) {
                                            result.push(cellNotesNotContainsAllCombination[j]);
                                        }
                                    }
                                }
                                if (countCombinationContainingNotes === n) {
                                    for (j = 0; j < combinationNotContainsAllCellNotes.length; j++) {
                                        cellNotes = notes.getValue(combinationNotContainsAllCellNotes[j]);
                                        if (cellNotes.removeAll(combination)) {
                                            result.push(combinationNotContainsAllCellNotes[j]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return result;
                };

                updated = [];
                // boxes
                for (i = 0; i < this.boxIndexes.length; i++) {
                    updated = updated.concat(handle(cells, notes, this.boxIndexes[i]));
                }
                // columns
                for (i = 0; i < this.columnIndexes.length; i++) {
                    updated = updated.concat(handle(cells, notes, this.columnIndexes[i]));
                }
                // rows
                for (i = 0; i < this.rowIndexes.length; i++) {
                    updated = updated.concat(handle(cells, notes, this.rowIndexes[i]));
                }
                return updated;
            };
            return new PartnershipStrategy();
        });
