import paper from 'paper';
import store from '@/store/index.js';
import history from '../history';
import { createLayer } from '../shared';

let local ={
    path : null,
    center : null,
    layer: null
};

export class RectangleAction{
    constructor(args) {
        this._args = args;
    }

    exec() {
        if (!paper.project.layers[this._args.layer]) {
            createLayer(this._args.layer);
        }
        if (this.removed) {
            return paper.project.layers[this._args.layer].addChildren(this.removed);
        }
    }
    unexec() {
        this.removed = paper.project.layers[this._args.layer].removeChildren();
    }
    get args() {
        return this._args;
    }
}

function onMouseDown(event) {
    local.layer = createLayer();
    local.center = event.point;
}

function onMouseDrag(event) {
    if (local.path) {
        local.path.remove();
    }
    local.path = new Shape.Rectangle(local.center, event.point);
    local.path.strokeColor = store.getters.shapeArgs.color;
    local.path.strokeWidth = store.getters.shapeArgs.size;
}

function onMouseUp(event) {
    local.layer.addChild(local.path);
    const action = new RectangleAction({
        layer: local.path.layer.name,
        tool: store.getters.tool,
        from: { x : local.center.x, y : local.center.y },
        to : { x : event.point.x, y : event.point.y }
    });
    local.path = null;
    history.add(action);;
}

export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
