'use strict';

/**
 * Used for caching VNodes.
 *
 * If a given state fails comparison with the previous state,
 * the node will be created via the provided rendering method.
 *
 * @param {object} state State object.
 * @param {function} cmpFn Comparison function.
 * @param {function} renderFn Rendering function. Must return a VNode.
 * @return {VNode} New or cached node.
 */
var VCache = function VCache(state, cmpFn, renderFn) {
    this.renderFn = renderFn;
    this.cmpFn = cmpFn;
    this.state = state;
};

VCache.prototype.type = 'Thunk';

VCache.prototype.render = function(previous) {
    // The first time the Thunk renders, there will be no previous state
    var previousState = previous ? previous.state : null;

    // We run the comparison function to see if the state has changed enough
    // for us to re-render. If it returns truthy, then we call the render
    // function to give us a new VNode
    if ((!previousState || !this.state) || this.cmpFn(previousState, this.state)) {
        return this.renderFn(previous, this);
    }
    else {
        // vnode will be set automatically when a thunk has been created
        // it contains the VNode, VText, Thunk, or Widget generated by
        // our render function.
        return previous.vnode;
    }
};

module.exports = VCache;
