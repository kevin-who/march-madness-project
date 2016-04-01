'use strict';

describe('Tree.selected', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            target: $tree,
            data: [{
                text: 'A',
                id: 1
            }]
        });
    });

    it('exists', function() {
        expect(tree.selected).to.be.a('function');
    });

    it('returns an empty array when none selected', function() {
        expect(tree.selected()).to.have.length(0);
    });

    it('returns selected root node', function() {
        tree.node(1).select();

        expect(tree.selected()).to.have.length(1);
    });

    it('auto-selects a node when requireSelection=true', function() {
        tree = new InspireTree({
            target: $tree,
            requireSelection: true,
            data: [{
                text: 'A',
                id: 1
            }]
        });

        expect(tree.selected()).to.have.length(1);
    });

    it('rejects deselect of only node when requireSelection=true', function() {
        tree.node(1).deselect();

        expect(tree.selected()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
