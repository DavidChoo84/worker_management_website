import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNameIdComponent } from './header-name-id.component';

describe('HeaderNameIdComponent', () => {
  let component: HeaderNameIdComponent;
  let fixture: ComponentFixture<HeaderNameIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNameIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNameIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
