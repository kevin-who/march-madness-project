'use strict';

describe('TreeNodes.prototype.expandDeep', function() {
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
                id: 1,
                children: [{
                    text: 'AA'
                }]
            }]
        });
    });

    it('exists', function() {
        expect(tree.expandDeep).to.be.a('function');
    });

    it('returns a promise', function() {
        expect(tree.expandDeep().then).to.be.a('function');
    });

    after(helpers.clearDOM);
});
