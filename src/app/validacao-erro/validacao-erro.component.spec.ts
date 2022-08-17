import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacaoErroComponent } from './validacao-erro.component';

describe('ValidacaoErroComponent', () => {
  let component: ValidacaoErroComponent;
  let fixture: ComponentFixture<ValidacaoErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacaoErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacaoErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
