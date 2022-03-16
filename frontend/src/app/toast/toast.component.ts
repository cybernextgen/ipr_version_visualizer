import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  showDelay = 3000

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

}
