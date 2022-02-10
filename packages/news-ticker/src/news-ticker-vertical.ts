/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import 'web-animations-js'

import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

const CUBIC_BEZIER_EASING = 'cubic-bezier(1, 0, 0.5, 0)'

@customElement('ox-news-ticker-vertical')
export default class ThingsNewsTickerVertical extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        overflow: hidden;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        white-space: nowrap;
      }

      #news_ticker {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
      }

      li {
        display: flex;
        height: 100%;
        align-items: center;
        overflow: hidden;
        text-align: var(--ox-news-ticker-text-align, left);
      }

      #news_ticker a {
        width: 100%;
        line-height: normal;
        color: var(--ox-news-ticker-font-color, black);
        text-decoration: none;
        font-size: var(--ox-news-ticker-font-size, 13px);
      }
    `
  ]

  @property({ type: Boolean }) isReverse: boolean = false
  @property({ type: Number }) duration: number = 30000
  @property({ type: String }) textData: string = ''

  private _anim?: Animation

  @query('#news_ticker > ul') animationTargetEl!: Element

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
      <div id="news_ticker">
        <ul>
          ${this.textLines.map(t => html` <li><a href="#">${t}</a></li> `)}
        </ul>
      </div>
    `
  }

  updated(changes: PropertyValues<this>) {
    if (changes.has('textData') || changes.has('duration') || changes.has('isReverse')) {
      this.startAnimation()
    }
  }

  startAnimation() {
    this.stopAnimation()

    var frames = this.createAnimationFrames()
    this.currentAnimation = this.animationTargetEl.animate(frames, {
      duration: this.textLines.length * this.duration,
      iterations: Infinity,
      direction: this.isReverse ? 'reverse' : 'normal'
    })
  }

  stopAnimation() {
    if (this.currentAnimation) this.currentAnimation.cancel()
  }

  createAnimationFrames() {
    var textLinesLength = this.textLines.length
    var frames = this.textLines.map((t, i) => {
      return {
        transform: `translateY(${-(i / textLinesLength) * 100}%)`,
        offset: (1 / textLinesLength) * i,
        easing: CUBIC_BEZIER_EASING
      }
    })

    frames.push({
      transform: `translateY(0)`,
      offset: 1,
      easing: CUBIC_BEZIER_EASING
    })

    return frames
  }
}
