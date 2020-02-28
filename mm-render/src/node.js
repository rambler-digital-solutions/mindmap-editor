export default class Node {
    constructor(id, name, parent) {
        this.nodeId = id;
        this.name = name;
        this.type = 'node';
        this.children = [];
        this.parent = parent;
        this.depth = parent ? parent.depth + 1 : 1;
        this.icons = [];
        this.attributes = [];
        this.isTested = false;
        this.isBug = false;
    }
}
