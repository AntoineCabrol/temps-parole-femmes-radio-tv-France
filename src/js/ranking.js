import $ from 'jquery';
import Rate from './rate';
import Search from './search';

export default class Ranking {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      ranking: $('.js-ranking'),
    };
    this.medias = require('../json/medias.json');
  }

  initEvents () {
    this.display();
  }

  display (typed) {
    this.$els.ranking.html('');
    if (typed !== undefined) {
      this.rankTyped(typed);
    }
    else {
      this.rankAll();
    }
  }

  rankAll () {
    // Radios
    this.medias.radio.forEach((element) => {
      this.$els.ranking.append(`
        <div class="search__ranking-media search__ranking-media--radio" title="${element.channel_name}">
          <img src="img/logos/radio/${element.logo}" alt="${element.channel_name}">
        </div>
        `);
    });
    // Tv
    this.medias.tv.forEach((element) => {
      this.$els.ranking.append(`
        <div class="search__ranking-media search__ranking-media--tv" title="${element.channel_name}">
          <img src="img/logos/tv/${element.logo}" alt="${element.channel_name}">
        </div>
        `);
    });
  }

  rankTyped (typed) {
    // Radios
    this.medias.radio.forEach((element) => {
      if (element.channel_name.includes(typed)) {
        this.$els.ranking.append(`
          <div class="search__ranking-media search__ranking-media--radio" title="${element.channel_name}">
            <img src="img/logos/radio/${element.logo}" alt="${element.channel_name}">
          </div>
          `);
      }
    });
    // Tv
    this.medias.tv.forEach((element) => {
      if (element.channel_name.includes(typed)) {
        this.$els.ranking.append(`
          <div class="search__ranking-media search__ranking-media--tv" title="${element.channel_name}">
            <img src="img/logos/tv/${element.logo}" alt="${element.channel_name}">
          </div>
          `);
      }
    });
  }
}
