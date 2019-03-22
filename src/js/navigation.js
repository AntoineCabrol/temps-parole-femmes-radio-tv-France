import $ from 'jquery';
import Rate from './rate';
import Search from './search';
import Timeline from './timeline';

export default class Navigation {
  constructor (timeline, search) {
    this.timeline = timeline;
    this.search = search;
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
    this.date = this.timeline.initDate(); // default
  }

  initEvents () {
    this.initMenu();
    this.$els.choices.click((e) => {
      this.$els.medias.removeClass('chosen chosen--searching');
      const currentTarget = $(e.currentTarget);
      const date = this.date;
      const type = currentTarget.data('type');
      Rate.displayStats(date, undefined, type);
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
    Rate.displayStats(date, undefined, type);
  }
}
