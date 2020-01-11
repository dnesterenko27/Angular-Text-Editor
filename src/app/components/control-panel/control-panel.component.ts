import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { SynonymService } from '../../services/synonym-service/synonym.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit {
  synonyms$: Observable<any>;
  @Input() el: HTMLElement;

  constructor(private synonymService: SynonymService) {
  }

  ngOnInit(): void {
    this.synonyms$ = this.synonymService.getSynonyms();
  }

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

  switchWord(el: HTMLElement, word) {
    el.innerText = word;
  }
}
