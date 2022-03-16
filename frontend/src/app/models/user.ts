import { DomainModel } from "./domain-model"

export class User extends DomainModel {
    constructor(
        public override id?: number,
        public username?: string,
        public authdata?: string
    ){
        super()
    }
}