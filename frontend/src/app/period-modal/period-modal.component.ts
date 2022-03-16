import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ModelService } from '../model.service'
import { ModelServiceBuilder } from '../model.service'
import { Period } from '../models/period'

@Component({
  selector: 'app-period-modal',
  templateUrl: './period-modal.component.html',
  styleUrls: ['./period-modal.component.scss']
})
export class PeriodModalComponent implements OnInit {
  @Input() editedPeriod: Period = new Period()
  periodService: ModelService<Period>
  periodForm: FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private modelServiceBuilder: ModelServiceBuilder,
    private formBuilder: FormBuilder,
  ) { 
    this.periodService = modelServiceBuilder.getPeriodService()
  }

  ngOnInit(): void {
    this.periodForm = this.formBuilder.group({
      name: [this.editedPeriod.name, Validators.required],
    })
  }

  save(): void {
    if (this.periodForm.invalid) {
      return
    }
    Object.assign(this.editedPeriod, this.periodForm.value)
    this.periodService.update(this.editedPeriod).subscribe(() => {
      this.activeModal.close()  
    })
  }

  close(): void {
    this.activeModal.dismiss('Modal Closed');
  } 

}
