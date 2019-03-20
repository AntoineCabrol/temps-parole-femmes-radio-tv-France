import $ from 'jquery';
import Rate from './rate';

export default class Navigation {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      choices: $('.js-choice-radio, .js-choice-tv, .js-choice-search'),
      choiceRadio: $('.js-choice-radio'),
      choiceTv: $('.js-choice-tv'),
      choiceSearch: $('.js-choice-search'),
    };
    this.rate = new Rate();
  }

  initEvents () {
    this.initMenu();
    this.$els.choices.click(() => this.rate.displayStats());
  }

  initMenu () {
    console.log('init Menu');
    this.$els.choiceRadio.click();
    this.rate.displayStats(); 
  }
}
