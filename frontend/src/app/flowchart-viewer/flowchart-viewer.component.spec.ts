import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowchartViewerComponent } from './flowchart-viewer.component';

describe('FlowchartViewerComponent', () => {
  let component: FlowchartViewerComponent;
  let fixture: ComponentFixture<FlowchartViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowchartViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowchartViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
