/* globals $ */
'use strict';
describe('Method', function() {

    var $form = $('#form');
    $form.inputNavigation();

    describe('#offsets()', function() {
        var offsets = $form.inputNavigation('offsets');
        it('should return an object.', function() {
            expect(offsets).to.be.a('object');
        });
    });

    describe('#inputs()', function() {
        var inputs = $form.inputNavigation('inputs');
        it('should return elements', function() {
            expect(inputs.length).to.not.equals(0);
        });
        it('should have element with tag name: input', function() {
            expect(inputs[0].tagName.toLowerCase()).to.equals('input');
        });
    });
});