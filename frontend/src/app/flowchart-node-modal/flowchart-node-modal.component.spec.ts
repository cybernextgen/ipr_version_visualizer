import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowchartNodeModalComponent } from './flowchart-node-modal.component';

describe('FlowchartNodeModalComponent', () => {
  let component: FlowchartNodeModalComponent;
  let fixture: ComponentFixture<FlowchartNodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowchartNodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowchartNodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
