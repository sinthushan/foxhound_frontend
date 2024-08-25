import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcanvasComponent } from './jobcanvas.component';

describe('JobcanvasComponent', () => {
  let component: JobcanvasComponent;
  let fixture: ComponentFixture<JobcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobcanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
