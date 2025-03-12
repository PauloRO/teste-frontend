import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectedsListComponent } from './customer-selecteds-list.component';

describe('CustomerSelectedsListComponent', () => {
  let component: CustomerSelectedsListComponent;
  let fixture: ComponentFixture<CustomerSelectedsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSelectedsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSelectedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
