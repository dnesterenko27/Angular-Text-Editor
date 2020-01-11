import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent {
  @Input() el: HTMLElement;

  @HostListener('click', ['$event']) onClick($event) {
    $event.stopPropagation();
  }

  toggleBold(el: HTMLElement) {
    el.style.fontWeight = el.style.fontWeight === 'bold' ? 'normal' : 'bold';
  }

  toggleItalic(el: HTMLElement) {
    el.style.fontStyle = el.style.fontStyle === 'italic' ? 'normal' : 'italic';
  }

  toggleUnderline(el: HTMLElement) {
    el.style.textDecoration = el.style.textDecoration === 'underline' ? 'none' : 'underline';
  }

  setColor(el: HTMLElement, event) {
    el.style.color = event.target.value;
  }
}
