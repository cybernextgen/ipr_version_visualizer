import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component'
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
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
    this.periodService = modelServiceBuilder.getPeriodService()
  }

  ngOnInit(): void {
    this.periodForm = this.formBuilder.group({
      name: [this.editedPeriod.name, Validators.required],
    })
  }

  delete(): void {
      const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'sm' })
      modalRef.componentInstance.message = 'Удалить выбранный интервал?' 
      modalRef.componentInstance.confirmButtonText = 'Удалить' 
  
      modalRef.result.then(() => {
        if(this.editedPeriod.id){
          this.periodService.delete(this.editedPeriod.id).subscribe(
            () => {
              this.activeModal.close()
              this.router.navigate([], {relativeTo:this.activatedRoute})
            }
          )
        }
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
