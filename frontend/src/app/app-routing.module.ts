import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FlowchartViewerComponent } from './flowchart-viewer/flowchart-viewer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'flowchart'
  },
  {
    path: 'flowchart', component: FlowchartViewerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
