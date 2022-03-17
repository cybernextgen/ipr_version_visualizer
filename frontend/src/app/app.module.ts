import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FlowchartViewerComponent } from './flowchart-viewer/flowchart-viewer.component'
import { ToastComponent } from './toast/toast.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BasicAuthInterceptor } from './basic-auth.interceptor'
import { ErrorInterceptor } from './error.interceptor';
import { LoginModalComponent } from './login-modal/login-modal.component'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { FlowchartNodeModalComponent } from './flowchart-node-modal/flowchart-node-modal.component'
import { ClipboardModule } from 'ngx-clipboard'
import { PeriodModalComponent } from './period-modal/period-modal.component'


@NgModule({
  declarations: [
    AppComponent,
    FlowchartViewerComponent,
    ToastComponent,
    LoginModalComponent,
    FlowchartNodeModalComponent,
    PeriodModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    ClipboardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
