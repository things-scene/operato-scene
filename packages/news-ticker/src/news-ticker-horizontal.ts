/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

@customElement('ox-news-ticker-horizontal')
export default class ThingsNewsTickerHorizontal extends LitElement {
  static styles = [
    css`
      :host * {
        box-sizing: border-box;
      }

      :host .ticker-wrap {
        position: absolute;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        height: 100%;
        background-color: rgba(#000, 0.9);
        padding-left: var(--ox-news-ticker-wrapper-padding-left);
        box-sizing: content-box;
        font-family: var(--ox-news-ticker-font-family);
      }

      :host .ticker-wrap .ticker {
        display: inline-block;
        min-width: 100%;
        text-align: var(--ox-news-ticker-text-align);
        height: 4rem;
        line-height: 4rem;
        white-space: nowrap;
        padding-right: var(--ox-news-ticker-container-padding-right);
        box-sizing: content-box;
      }

      :host .ticker-wrap .ticker__item {
        display: inline-block;
        font-size: var(--ox-news-ticker-font-size);
        color: var(--ox-news-ticker-font-color);
      }

      :host body {
        padding-bottom: 5rem;
      }
      :host h1,
      :host h2,
      :host p {
        padding: 0 5%;
      }
    `
  ]

  @property({ type: Boolean }) isReverse: boolean = false
  @property({ type: Boolean }) isTextOverflowed?: boolean
  @property({ type: Number }) duration: number = 30000
  @property({ type: String }) textData: string = ''

  private _anim?: Animation

  @query('.ticker-wrap .ticker') animationTargetEl!: Element

  get currentAnimation() {
    return this._anim
  }

  set currentAnimation(anim) {
    this._anim = anim
  }

  get textLines() {
    return this.textData.split('\n')
  }

  render() {
    return html`
      <div class="ticker-wrap">
        <div class="ticker">${this.textLines.map(t => html` <div class="ticker__item">${t}</div> `)}</div>
      </div>
    `
  }

  updated(changes: PropertyValues<this>) {
    if (
      changes.has('textData') ||
      changes.has('duration') ||
      changes.has('isReverse') ||
      changes.has('isTextOverflowed')
    ) {
      this.style.setProperty('--ox-news-ticker-wrapper-padding-left', this.isTextOverflowed ? '100%' : '0')
      this.style.setProperty('--ox-news-ticker-container-padding-right', this.isTextOverflowed ? '100%' : '0')

      this.startAnimation()
    }
  }

  startAnimation() {
    this.stopAnimation()

    if (!this.isTextOverflowed) return

    this.currentAnimation = this.animationTargetEl.animate(
      [
        {
          transform: 'translate3d(0, 0, 0)',
          visibility: 'hidden'
        },
        {
          transform: 'translate3d(-100%, 0, 0)',
          visibility: 'visible'
        }
      ],
      {
        duration: this.duration,
        iterations: Infinity,
        direction: this.isReverse ? 'reverse' : 'normal'
      }
    )
  }

  stopAnimation() {
    if (this.currentAnimation) {
      this.currentAnimation.cancel()
    }
  }
}
