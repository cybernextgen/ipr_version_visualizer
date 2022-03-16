import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FlowchartNodeData } from '../models/flowchart-node-data'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-flowchart-node-modal',
  templateUrl: './flowchart-node-modal.component.html',
  styleUrls: ['./flowchart-node-modal.component.scss']
})
export class FlowchartNodeModalComponent implements OnInit {

  @Input() nodeData: FlowchartNodeData = new FlowchartNodeData()
  @Input() isEditMode = true
  nodeForm: FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let d = new Date()
    if(this.nodeData.date){
      d = new Date(this.nodeData.date) 
    }

    let datepickerDate: NgbDate = new NgbDate(d.getFullYear(), d.getMonth() + 1, d.getDate())

    this.nodeForm = this.formBuilder.group({
      name: [this.nodeData.name, Validators.required],
      date: [datepickerDate, Validators.required],
      link: [this.nodeData.link, Validators.required],
      owner: [this.nodeData.owner,],
      comment: [this.nodeData.comment,],
    })
  }

  get f() { return this.nodeForm.controls }

  save() {
    if(this.nodeForm.invalid){
      return
    }
    let datepickerDate = this.f['date'].value
    let date = new Date(datepickerDate.year, datepickerDate.month-1, datepickerDate.day)
    let formValues = this.nodeForm.value
    formValues['date'] = date
    Object.assign(this.nodeData, this.nodeForm.value)
    console.log(this.nodeData)
    this.activeModal.close(this.nodeData)
  }

  close(): void {
    this.activeModal.dismiss('Modal Closed');
  } 

}
