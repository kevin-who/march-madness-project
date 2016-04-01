'use strict';

describe('TreeNodes.prototype.get', function() {
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
        expect(tree.nodes().get).to.be.a('function');
    });

    it('returns undefined for an invalid index', function() {
        expect(tree.nodes().get(50)).to.be.undefined;
    });

    it('returns a node for a valid index', function() {
        expect(tree.nodes().get(1).text).to.equal('B');
    });

    after(helpers.clearDOM);
});
