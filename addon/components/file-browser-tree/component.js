import Ember from 'ember';
import layout from './template';

/**
 * A row could represent a node, file-provider, or file, each of which has a
 * different interface. RowProxy provides a consistent interface for everything
 * the file browser needs to know.
 */
let RowProxy = Ember.ObjectProxy.extend({
    selected: false,
    expanded: false,
    childTrees: Ember.computed('files.[]', 'children.[]', function() {
        let childTrees = Ember.A();
        childTrees.addObjects(this.get('files') || []);
        childTrees.addObjects(this.get('children') || []);
        return childTrees;
    })
});

export default Ember.Component.extend({
    layout,
    tagName: 'tbody',
    expanded: Ember.computed.alias('row.expanded'),

    nextSelectedPath: Ember.computed('selectedPath', function() {
        let selectedPath = this.get('selectedPath');
        return selectedPath ? selectedPath.slice(1) : null;
    }),

    row: Ember.computed('root', 'selectedPath', function() {
        let row = RowProxy.create({ content: this.get('root') });
        let selectedPath = this.get('selectedPath');
        if (selectedPath && selectedPath.length) {
            if (row.get('itemName') === selectedPath[0]) {
                row.set('expanded', true);
                if (selectedPath.length === 1) {
                    row.set('selected', true);
                }
            }
        }
        return row;
    }),

    linkable: Ember.computed.or('row.isFile', 'row.isNode'),

    actions: {
        clickRow(row) {
            let action = null;
            if (row.get('isFile') || row.get('isFolder')) {
                action = this.get('onClickFile');
            } else if (row.get('isNode')) {
                action = this.get('onClickNode');
            }
            if (action) {
                action(row.content);
            }
        }
    }
});
