import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Er404 } from './er404';

describe('Er404', () => {
  let component: Er404;
  let fixture: ComponentFixture<Er404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Er404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Er404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
