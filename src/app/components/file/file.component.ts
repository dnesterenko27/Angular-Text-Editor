import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TextService } from '../../services/text-service/text.service';
import { Observable, Subject } from 'rxjs';
import { SynonymService } from '../../services/synonym-service/synonym.service';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent implements OnInit {
  selectedEl: HTMLElement;
  contentEditable = false;
  synonyms: string[] = null;

  text$: Observable<string>;
  clickStream$ = new Subject<any>();

  @ViewChild('controlPanel', {read: ElementRef, static: false}) controlPanel;
  @ViewChild('textField', {read: ElementRef, static: false}) textField;

  constructor(private textService: TextService,
              private synonymService: SynonymService) {
  }

  @HostListener('click', ['$event'])
  onTextSelected($event) {
    this.clickStream$.next($event);
  }

  handleClicks(event) {
    if (this.contentEditable) {
      return;
    }

    const el = event.target;
    this.selectedEl = el;

    if (el.classList.contains('editable')) {
      this.synonymService.retrieveSynonyms(el.innerText)
        .pipe(take(1))
        .subscribe();
    }
    this.toggleControls(el.classList.contains('editable'), el);
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();
    this.clickStream$.asObservable()
      .pipe(
        debounceTime(100),
        distinctUntilChanged((a, b) => a.target === b.target),
      )
      .subscribe(event => this.handleClicks(event));
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
      elStyle.top = `${el.offsetTop - 95}px`;
      elStyle.left = `${el.offsetLeft - el.offsetWidth / 2}px`;
    }
  }

  toggleEditing(textField) {
    this.toggleControls(false, null);
    this.contentEditable = !this.contentEditable;
    if (!this.contentEditable) {
      this.saveText(textField.innerText);
    }
  }

  saveText(text: string) {
    this.textService.text$.next(text);
  }
}
