import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent implements OnInit {
  selectedEl: HTMLElement;

  text$: Promise<string>;
  @ViewChild('controlPanel', {read: ElementRef}) controlPanel;

  constructor(private textService: TextService) {
  }

  @HostListener('click', ['$event'])
  onTextSelected($event) {
    const el = $event.target;
    this.selectedEl = el;
    this.toggleControls(el.classList.contains('editable'), el);
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }

  splitText(text) {
    if (!text) {
      return;
    }
    return text.split(' ')
      .map(word => `<span class="editable">${word}</span>`)
      .join(' ');
  }

  toggleControls(condition: boolean, el) {
    const elStyle = this.controlPanel.nativeElement.style;
    elStyle.opacity = Number(condition);
    elStyle.pointerEvents = condition ? 'all' : 'none';
    if (condition) {
      elStyle.top = `${el.offsetTop - 50}px`;
      elStyle.left = `${el.offsetLeft - el.offsetWidth / 2}px`;
    }
  }
}
