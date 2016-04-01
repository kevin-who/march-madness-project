'use strict';

describe('TreeNodes.prototype.available', function() {
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Create tree
        tree = new InspireTree({
            target: $('.tree'),
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                itree: {
                    state: {
                        removed: true
                    }
                }
            }]
        });
    });

    it('exists', function() {
        expect(tree.nodes().available).to.be.a('function');
        expect(tree.available).to.be.a('function');
    });

    it('returns only available nodes', function() {
        expect(tree.nodes().available()).to.have.length(1);
    });

    after(helpers.clearDOM);
});
