export class FlowchartNodeData {

    constructor(
        public id?: number|string,
        public name?: string,
        public date?: Date,
        public owner?: string,
        public link?: string,
        public comment?: string
    ){

    }
}