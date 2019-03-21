import $ from 'jquery';
import Rate from './rate';
import Search from './search';
import Timeline from './timeline';

export default class Navigation {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      medias: $('.js-radio, .js-tv, .js-search'),
      choices: $('.js-choice-radio, .js-choice-tv'),
      choiceRadio: $('.js-choice-radio'),
      choiceTv: $('.js-choice-tv'),
      choiceSearch: $('.js-choice-search'),
    };
    this.rate = new Rate();
    this.search = new Search();
    this.timeline = new Timeline();
    this.date = this.timeline.initDate(); // default
  }

  initEvents () {
    this.initMenu();
    this.$els.choices.click((e) => {
      this.$els.medias.removeClass('chosen chosen--searching');
      const currentTarget = $(e.currentTarget);
      const date = this.date;
      const type = currentTarget.data('type');
      this.rate.displayStats(date, undefined, type);
    });
    this.$els.choiceSearch.click(() => {
      this.$els.medias.removeClass('chosen chosen--searching');
      this.search.init();
    });
  }

  initMenu () {
    this.$els.choiceRadio.click();
    const date = this.date;
    const type = 'radio';
    this.rate.displayStats(date, undefined, type);
  }
}
