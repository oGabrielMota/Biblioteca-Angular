import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'validacao-erro',
  templateUrl: './validacao-erro.component.html',
  styleUrls: ['./validacao-erro.component.css'],
})
export class ValidacaoErroComponent implements OnInit {
  @Input() type: string = 'success';
  @Input() top: boolean = false;

  ngOnInit(): void {
    if (this.top) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
    setTimeout(function () {
      $('.alert').hide(1000);
    }, 2000);
  }
}
