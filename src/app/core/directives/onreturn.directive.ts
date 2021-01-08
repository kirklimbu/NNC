import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appOnreturn]',
})
export class OnreturnDirective {
  // props
  private el: ElementRef;
  @Input() onReturn: string;

  constructor(private _el: ElementRef, renderer: Renderer2) {
    this.el = this._el;
    // renderer.setStyle(_el.nativeElement, 'color', 'red');
  }
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    console.log(e);

    if (e.which == 13 || e.keyCode == 13) {
      e.preventDefault();

      if (e.srcElement.form) {
        console.log('inside sibiling');
        console.log('form vaues ' + JSON.stringify(e.srcElement.form.localName));

        e.srcElement.form.focus();
        console.log(e.srcElement.form.focus());
      } else {
        console.log('close keyboard');
      }
      return;
    }
  }
}
