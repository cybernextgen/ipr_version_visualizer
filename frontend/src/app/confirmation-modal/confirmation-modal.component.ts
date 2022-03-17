import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() message = 'Выполнить действие?'
  @Input() confirmButtonText = 'Выполнить'

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.activeModal.close()
  }

  close(): void {
    this.activeModal.dismiss('Modal Closed');
  } 


}
