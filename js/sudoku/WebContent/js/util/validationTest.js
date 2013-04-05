define([ './validation' ], function (validation) {

    describe("validation", function () {

        it("all should be valid with all valid cells", function () {
            var cells = [ 8, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3,
                    2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5,
                    4, 3, 9 ];
            var actual = validation.isAllValid(cells);
            var expected = true;
            expect(actual).toEqual(expected);
        });

        it("all should not be valid with some unvalid cells", function () {
            var cells = [ 5, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3,
                    2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5,
                    4, 3, 9 ];
            var actual = validation.isAllValid(cells);
            var expected = false;
            expect(actual).toEqual(expected);
        });

        it("cell should be valid with valid cells", function () {
            var cells = [ 8, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3,
                    2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5,
                    4, 3, 9 ];
            var actual = validation.isValid(cells, 40);
            var expected = true;
            expect(actual).toEqual(expected);
        });

        it("cell should not be valid with unvalid cells", function () {
            var cells = [ 5, 5, 6, 1, 7, 4, 2, 9, 3, 9, 7, 1, 2, 8, 3, 5, 6, 4, 4, 2, 3, 6, 5, 9, 8, 7, 1, 7, 4, 5, 3, 1, 6, 9, 2, 8, 1, 3,
                    2, 5, 9, 8, 7, 4, 6, 6, 8, 9, 4, 2, 7, 3, 1, 5, 3, 9, 8, 7, 4, 1, 6, 5, 2, 5, 6, 4, 9, 3, 2, 1, 8, 7, 2, 1, 7, 8, 6, 5,
                    4, 3, 9 ];
            var actual = validation.isValid(cells, 10);
            var expected = false;
            expect(actual).toEqual(expected);
        });

    });
});