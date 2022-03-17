import { Component, ElementRef, OnInit } from '@angular/core'
import { ModelService, ModelServiceBuilder } from '../model.service'
import { Period } from '../models/period'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginModalComponent } from '../login-modal/login-modal.component'
import { AuthenticationService } from '../authentication.service'
import { User } from '../models/user'
import Drawflow from 'drawflow'
import { FlowchartNodeModalComponent } from '../flowchart-node-modal/flowchart-node-modal.component'
import { FlowchartNodeData } from '../models/flowchart-node-data'
import { formatDate } from '@angular/common'
import { ClipboardService } from 'ngx-clipboard'
import { ToastService } from '../toast.service'
import { PeriodModalComponent } from '../period-modal/period-modal.component'
import { Filter } from '../models/filter'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-flowchart-viewer',
  templateUrl: './flowchart-viewer.component.html',
  styleUrls: ['./flowchart-viewer.component.scss']
})
export class FlowchartViewerComponent implements OnInit {
  periodService: ModelService<Period>
  periods:Period[] = []
  currentPeriod: Period = new Period()
  user: User
  editor: Drawflow
  isEditMode = false
  
  editedNode: any
  filter: string

  constructor(
      private modelServiceBuilder: ModelServiceBuilder, 
      private toastService: ToastService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private modalService: NgbModal,
      private elementRef:ElementRef,
      private clipboardService: ClipboardService,
    ) {
    this.periodService = modelServiceBuilder.getPeriodService()
    this.authenticationService.user.subscribe(x => this.changeUser(x))
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const currentPeriodId = params['period_id']
      if(currentPeriodId){
        this.periodService.get(currentPeriodId).subscribe({
          next: (result) => {
            this.currentPeriod = result
            this.redrawFlowchart()
          },
          error: () => {
            this.router.navigate([], {relativeTo:this.activatedRoute})
          }
        }) 
      }else{
        this.periodService.getList().subscribe((result) => {
          if(result.length){
            this.currentPeriod = result[0]
            this.redrawFlowchart()
          }
        })
      }
    })

    this.loadPeriods()
    const div = this.elementRef.nativeElement.querySelector('#drawflow');
    this.initFlowchart(div)
  }

  filterChanged(): void {
    this.loadPeriods()
  }

  resetFilter(): void {
    this.filter = ''
    this.loadPeriods()
  }

  private loadPeriods(): void {
    let periodQuery: Observable<Period[]>

    if(this.filter){
      periodQuery = this.periodService.getList(new Filter('name', 'icontains', this.filter))
    }else{
      periodQuery = this.periodService.getList()
    }

    periodQuery.subscribe((result) => {
      this.periods = result
    })
  }

  selectPeriod(periodId?: number|string): void {
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: { period_id: periodId }})
  }

  private renderNodeTemplate(nodeData: FlowchartNodeData): string {
    let owner = ''
    if(nodeData.owner){
      owner = `<div class="mt-1">Ответственный: ${nodeData.owner}</div>`
    }

    let comment = ''
    if(nodeData.comment){
      comment = `<div class="mt-1">Комментарий: ${nodeData.comment}</div>`
    }

    let date = ''
    if(nodeData.date){
      date = formatDate(nodeData.date, "dd.MM.y", 'ru')
    }

    return `<h5>${nodeData.name}</h5><h5>${date}</h5>
    <div class="mt-1">Ссылка: ${nodeData.link}</div>${owner}${comment}`
  }

  editDocument(): void {
    const modalRef = this.modalService.open(FlowchartNodeModalComponent, { size: 'md' })

    modalRef.result.then((nodeData: FlowchartNodeData) => {
      if(!nodeData.id){
        this.editor.addNode('document', 1, 1, 50, 50, 'document', nodeData, this.renderNodeTemplate(nodeData), false)
      }
    }, () => {})
  }

  editPeriod(editedPeriod?: Period): void {
    const modalRef = this.modalService.open(PeriodModalComponent, { size: 'md' })
    if(editedPeriod){
      modalRef.componentInstance.editedPeriod = editedPeriod
    }

    modalRef.result.then(() => {
      this.loadPeriods()
    })
  }

  save(): void {
    if(this.isEditMode){
      const serialized_json = JSON.stringify(this.editor.export())
      this.currentPeriod.flowchart_json = serialized_json
      this.periodService.update(this.currentPeriod).subscribe()
    }
  }

  openLoginModal(): void {
    const modalRef = this.modalService.open(LoginModalComponent, { size: 'md' })
  }

  logout() {
    this.authenticationService.logout();
  }

  private changeUser(newUser: User): void {
    this.user = newUser
    if(this.user.id){
      this.isEditMode = true
      if(this.editor){
        this.editor.editor_mode = 'edit'
      }
    }else{
      this.isEditMode = false
      if(this.editor){
        this.editor.editor_mode = 'view'
      }
    }
  }

  private initFlowchart(el: HTMLElement): void {
    try {
      if (!!el) {
        this.editor = new Drawflow(el)
        this.editor.reroute = true
        if(this.isEditMode){
          this.editor.editor_mode = 'edit'
        }else{
          this.editor.editor_mode = 'view'
        }
        this.editor.start()
        this.editor.zoom_value = 0.075
        this.editor.zoom_min = 0.3
        this.editor.zoom_max = 1.3

        const storedZoom = localStorage.getItem('zoom')
        let currentZoom = 1
        if(storedZoom){
          currentZoom = parseFloat(storedZoom)
        }
        this.editor.zoom = currentZoom
        this.editor.zoom_refresh()

        this.editor.on('nodeSelected', id => {
          this.editedNode = this.editor.getNodeFromId(id)
        })

        this.editor.on('nodeSelected', id => {
          this.editedNode = this.editor.getNodeFromId(id)
        })

        this.editor.on('zoom', (currentZoom) => {
          localStorage.setItem('zoom', currentZoom)
        })

        this.editor.on('contextmenu', event => {
          let e = (event as any)
          const nodeName: string = e?.srcElement?.offsetParent?.id
          if(nodeName){
            const nodeId = nodeName.replace('node-', '')
            const editedNode = this.editor.getNodeFromId(nodeId)
            if(editedNode){
              this.clipboardService.copy(editedNode.data.link)
              this.toastService.showSuccess('Ссылка успешно скопирована в буффер обмена!')
            }
          }
        })
      } else {
        this.toastService.showDanger('Не удалось инициализировать библиотеку DrawFlow, родительский элемент не существует!')
      }

    } catch (exception) {
      console.error('Unable to start Drawflow', exception)
      this.toastService.showDanger('Не удалось инициализировать библиотеку DrawFlow!')
    }
  }
  
  private redrawFlowchart(): void {
    if(this.editor){
      this.editor.clear()
      if(this.currentPeriod.flowchart_json){
        const parsedJson = JSON.parse(this.currentPeriod.flowchart_json)
        this.editor.import(parsedJson)
      }
    }
  }
}
