/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import './news-ticker-horizontal'
import './news-ticker-vertical'

import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ox-news-ticker')
export default class ThingsNewsTicker extends LitElement {
  @property({ type: String }) textData: string = ''
  @property({ type: String }) fontFamily: string = ''
  @property({ type: String }) fontColor: string = ''
  @property({ type: String }) fontSize: string = ''
  @property({ type: String }) textAlign: string = ''
  @property({ type: Boolean }) isReverse: boolean = false
  @property({ type: Boolean }) isTextOverflowed: boolean = false
  @property({ type: String }) direction?: 'vertical' | 'horizontal'
  @property({ type: Number }) duration: number = 30000

  render() {
    return html`
      ${this.direction == 'vertical'
        ? html`
            <ox-news-ticker-vertical
              .duration=${this.duration}
              .isReverse=${this.isReverse}
              .isTextOverflowed=${this.isTextOverflowed}
              .textData=${this.textData}
            ></ox-news-ticker-vertical>
          `
        : html`
            <ox-news-ticker-horizontal
              .duration=${this.duration}
              .isReverse=${this.isReverse}
              .isTextOverflowed=${this.isTextOverflowed}
              .textData=${this.textData}
            ></ox-news-ticker-horizontal>
          `}
    `
  }

  updated() {
    this.style.setProperty('--ox-news-ticker-font-family', this.fontFamily)
    this.style.setProperty('--ox-news-ticker-font-size', this.fontSize)
    this.style.setProperty('--ox-news-ticker-font-color', this.fontColor)
    this.style.setProperty('--ox-news-ticker-text-align', this.textAlign)
  }
}
