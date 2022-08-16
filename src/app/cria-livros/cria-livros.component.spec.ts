import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaLivrosComponent } from './cria-livros.component';

describe('CriaLivrosComponent', () => {
  let component: CriaLivrosComponent;
  let fixture: ComponentFixture<CriaLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriaLivrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriaLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
