'use strict';

describe('TreeNode.prototype.selectable', function() {
    var $tree;
    var tree;

    before(function() {
        helpers.createTreeContainer();

        // Query DOM
        $tree = $('.tree');

        // Create tree
        tree = new InspireTree({
            allowSelection: function(node) {
                if (node.id === '3') {
                    return false;
                }
            },
            target: $tree,
            data: [{
                text: 'A',
                id: 1
            }, {
                text: 'B',
                id: 2,
                itree: {
                    state: {
                        selectable: false
                    }
                }
            }, {
                text: 'C',
                id: 3
            }]
        });
    });

    it('exists', function() {
        expect(tree.node(1).selectable).to.be.a('function');
    });

    it('returns true for default nodes', function() {
        expect(tree.node(1).selectable()).to.be.true;
    });

    it('returns false for unselectable node', function() {
        expect(tree.node(2).selectable()).to.be.false;
    });

    it('does not select unselectable node', function() {
        var node = tree.node(2);
        node.select();

        expect(node.selected()).to.be.false;
    });

    it('returns true for default node when using allowSelection', function() {
        expect(tree.node(1).selectable()).to.be.true;
    });

    it('returns false for unselectable node when using allowSelection', function() {
        expect(tree.node(3).selectable()).to.be.false;
    });

    after(helpers.clearDOM);
});
