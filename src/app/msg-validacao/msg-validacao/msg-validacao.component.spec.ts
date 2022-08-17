import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgValidacaoComponent } from './msg-validacao.component';

describe('MsgValidacaoComponent', () => {
  let component: MsgValidacaoComponent;
  let fixture: ComponentFixture<MsgValidacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgValidacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgValidacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
