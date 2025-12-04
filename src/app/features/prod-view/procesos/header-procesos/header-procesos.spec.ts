import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProcesos } from './header-procesos';

describe('HeaderProcesos', () => {
  let component: HeaderProcesos;
  let fixture: ComponentFixture<HeaderProcesos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderProcesos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderProcesos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
