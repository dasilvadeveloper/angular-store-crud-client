import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[red]'
})
export class RedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#c75151'
  }

}
