import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Filter } from './models/filter'
import { ToastService } from './toast.service'
import { DomainModel } from './models/domain-model'
import { tap } from 'rxjs'
import { Period } from './models/period'


export class ModelService<T extends DomainModel> {
  jsonHeaders = new HttpHeaders().set("Content-Type", "application/json")

  constructor(private http: HttpClient, private toastService: ToastService, private url: string) {}

  getList(filter?: Filter){
    let url = this.url
    if(filter){
      url = `${this.url}?${filter.buildUrlParameters()}`
    }
    return this.http.get<T[]>(url)
  }

  get(id: number|string){
    return this.http.get<T>(`${this.url}${id}/`)
  }

  create(obj: T){
    return this.http.post<T>(this.url, JSON.stringify(obj),{headers: this.jsonHeaders}).pipe(tap(
      () => this.toastService.showSuccess('Объект создан успешно!')))
  }
  
  update(obj: T) {

    if(obj.id){
      return this.http.put<T>(`${this.url}${obj.id}/`, JSON.stringify(obj), {headers:this.jsonHeaders}).pipe(tap(
        () => this.toastService.showSuccess('Объект обновлён успешно!')))
    }else{
      return this.create(obj)
    }
  }

  delete(id: string){  
    return this.http.delete<T>(`${this.url}${id}/`).pipe(tap(
      () => this.toastService.showSuccess('Объект уделён успешно!')))
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModelServiceBuilder {

  constructor(private httpClient: HttpClient, private toastService: ToastService){}

  getPeriodService(): ModelService<Period> {
    return new ModelService<Period>(this.httpClient, this.toastService, `/api/periods/`)
  }
}
