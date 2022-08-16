import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaAutoresComponent } from './cria-autores.component';

describe('CriaAutoresComponent', () => {
  let component: CriaAutoresComponent;
  let fixture: ComponentFixture<CriaAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriaAutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriaAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
