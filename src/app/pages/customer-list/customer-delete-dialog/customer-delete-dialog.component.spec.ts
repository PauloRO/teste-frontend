import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeleteDialogComponent } from './customer-delete-dialog.component';

describe('CustomerDeleteDialogComponent', () => {
  let component: CustomerDeleteDialogComponent;
  let fixture: ComponentFixture<CustomerDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
