export class Filter {
    constructor(public fieldName: string, public predicate: 'exact' | 'icontains', public value: string | number){}

    buildUrlParameters(): string {
        return `${this.fieldName}__${this.predicate}=${this.value}`
    }
}