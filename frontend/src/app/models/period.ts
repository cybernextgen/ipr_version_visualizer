import { DomainModel } from "./domain-model"

export class Period extends DomainModel{
    constructor(
        public name = '',
        public created_datetime?: Date,
        public comment?: string,
        public flowchart_json?: any,
        public override id?: number,
    ){
        super()
    }
}