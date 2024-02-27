import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';

const KEYWORDS: string[] = [
  'flying',
  'first strike',
  'deathtouch',
  'hexproof',
  'lifelink',
  'menace',
  'reach',
  'trample',
  'vigilance',
  '+1/+1'
];

interface Counter {
  name: string;
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  keywords: Counter[] = KEYWORDS.map(
    keyword => ({
      name: keyword,
      count: 0
    })
  );

  customKeywords: Counter[] = []

  title = 'cystalline-giant';
  imageHeight = 0;
  imageWidth = 0;
  isEditing = false;

  @ViewChild('cardImage') cardImage!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(!this.cardImage) {
      return;
    }

    const width = this.cardImage.nativeElement.offsetWidth;
    const height = this.cardImage.nativeElement.offsetHeight;

    this.imageHeight = height;
    this.imageWidth = width;
  }

  ngAfterViewInit() {
    timer(200).subscribe(_ => this.onResize());
  }

  addKeyword() {
    const remainingKeywords = this.keywords.filter(counter => counter.count === 0);

    if (!remainingKeywords.length) {
      return;
    }

    const keywordIndex = Math.floor(Math.random() * remainingKeywords.length);
    remainingKeywords[keywordIndex].count += 1;
  }

  resetKeywords() {
    this.keywords = this.keywords.map(
      keyword => {
        keyword.count = 0;
        return keyword;
    });
    this.customKeywords = [];
  }

  proliforate() {
    this.keywords = this.keywords
      .map(
        keyword => {
          if (keyword.count > 0) {
            keyword.count += 1;
          }
          return keyword;
        });
    this.customKeywords = this.customKeywords
      .map(
        keyword => {
          if (keyword.count > 0) {
            keyword.count += 1;
          }
          return keyword;
        });
  }

  filteredKeywords() {
    return this.keywords.concat(this.customKeywords).filter(counter => counter.count !== 0);
  }

  capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
  }

  setEditMode(newMode: boolean) {
    this.isEditing = newMode;
    this.onResize();
  }

  onAddCustomCounter() {
    this.customKeywords.push({
      name: this.customCounter,
      count: 1,
    });
    this.customCounter = '';
  }

  addCounter(name: string) {
    this.keywords = this.keywords.map(kw => {
      if (kw.name === name) {
        kw.count += 1;
      }

      return kw
    })

    this.customKeywords = this.customKeywords.map(kw => {
      if (kw.name === name) {
        kw.count += 1;
      }

      return kw
    })
  }

  removeCounter(name: string) {
    this.keywords = this.keywords.map(kw => {
      if (kw.name === name) {
        kw.count -= 1;
      }

      return kw
    })

    this.customKeywords = this.customKeywords.map(kw => {
      if (kw.name === name) {
        kw.count -= 1;
      }

      return kw
    })
  }

  customCounter = '';
}
