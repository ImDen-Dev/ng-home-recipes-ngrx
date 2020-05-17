import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) mouseClick(event: Event) {
    this.elRef.nativeElement.contains(event.target as HTMLElement)
      ? this.elRef.nativeElement.children[1].classList.toggle('show')
      : this.elRef.nativeElement.children[1].classList.remove('show');
  }
}
