import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  isTabletOrSmaller: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  mobileMaxWidth = 480;
  tabletMaxWidth = 1024;

  deviceWidth$: Observable<number>;

  state$: Observable<ResponsiveState>;
  viewport$: Observable<VisualViewport>;

  private viewport = this.document.defaultView?.visualViewport as VisualViewport;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.viewport$ = fromEvent(this.viewport, 'resize').pipe(
      map(e => (e.target as VisualViewport)),
      startWith(this.viewport)
    );

    this.deviceWidth$ = this.viewport$.pipe(
      map(viewport => {
        return viewport.width;
      })
    );

    this.state$ = this.viewport$.pipe(
      map(viewport => {
        return {
          isMobile: viewport.width <= this.mobileMaxWidth,
          isTablet: viewport.width > this.mobileMaxWidth && viewport.width <= this.tabletMaxWidth,
          isDesktop: viewport.width > this.tabletMaxWidth,
          width: viewport.width,
          height: viewport.height,
          isTabletOrSmaller: viewport.width <= this.tabletMaxWidth
        }
      })
    )
  }

  get isMobile() {
    return this.viewport.width <= this.mobileMaxWidth;
  }

  get isTablet() {
    return !this.isMobile && this.viewport.width <= this.tabletMaxWidth;
  }

  get isDesktop() {
    return !this.isTablet && !this.isMobile;
  }
}
