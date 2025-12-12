import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-additional-comments',
  templateUrl: './additional-comments.component.html',
  styleUrls: ['./additional-comments.component.scss']
})
export class AdditionalCommentsComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;
  @ViewChild('commentsTextArea', { read: ElementRef, static: true }) textArea: ElementRef;

  public maxLength: number = 3000;

  constructor() { }

  ngOnInit() {
  }

  public autoGrow(): void {
    const textArea: any = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
