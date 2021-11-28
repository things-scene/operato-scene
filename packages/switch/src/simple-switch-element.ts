import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ox-simple-switch')
export class SimpleSwitchElement extends LitElement {
  static styles = css`
    /* The switch - the box around the slider */
    label {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    /* Hide default HTML checkbox */
    label input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    span {
      position: absolute;
      cursor: pointer;
      width: var(--ox-simple-switch-fullwidth);
      height: var(--ox-simple-switch-fullheight);
      top: calc(0 - var(--ox-simple-switch-thumbnail-size));
      left: 0;
      background-color: var(--ox-simple-switch-off-color, #ccc);
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    span:before {
      position: absolute;
      content: '';
      height: calc(var(--ox-simple-switch-thumbnail-size) - 8px);
      width: calc(var(--ox-simple-switch-thumbnail-size) - 8px);
      left: 4px;
      top: 4px;
      background-color: var(--ox-simple-switch-thumbnail-color, white);
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + span {
      background-color: var(--ox-simple-switch-on-color, #2196f3);
    }

    input:checked + span:before {
      -webkit-transform: translateX(calc(var(--ox-simple-switch-fullwidth) - var(--ox-simple-switch-thumbnail-size)))
        translateY(calc(var(--ox-simple-switch-fullheight) - var(--ox-simple-switch-thumbnail-size)));
      -ms-transform: translateX(calc(var(--ox-simple-switch-fullwidth) - var(--ox-simple-switch-thumbnail-size)))
        translateY(calc(var(--ox-simple-switch-fullheight) - var(--ox-simple-switch-thumbnail-size)));
      transform: translateX(calc(var(--ox-simple-switch-fullwidth) - var(--ox-simple-switch-thumbnail-size)))
        translateY(calc(var(--ox-simple-switch-fullheight) - var(--ox-simple-switch-thumbnail-size)));
    }

    /* Rounded sliders */
    span[round] {
      border-radius: calc(var(--ox-simple-switch-thumbnail-size) / 2);
    }

    span[round]:before {
      border-radius: calc((var(--ox-simple-switch-thumbnail-size) - 8px) / 2);
    }
  `

  @property({ type: Boolean }) round: boolean = false
  @property({ type: Boolean }) value: boolean = false

  render() {
    return html`
      <label>
        <input type="checkbox" .checked=${this.value} />
        <span ?round=${this.round}></span>
      </label>
    `
  }

  firstUpdated() {
    this.renderRoot.addEventListener('change', (e: Event) => {
      this.value = (e.target as HTMLInputElement)?.checked
      this.dispatchEvent(
        new CustomEvent('value-change', {
          detail: this.value
        })
      )
    })
  }
}
