define([ './generator', '../util/validation' ], function (generator, validation) {

    describe("generator", function () {

        it("generate() should be valid", function () {
            var actual, cells, expected;

            // expect(notes.getValues([0])).toEqual([null]);
            expect(generator.generate).toBeDefined();

            // Test generate
            cells = generator.generate();
            actual = validation.isAllValid(cells);
            expected = true;
            expect(actual).toBe(expected);
        });

    });
});