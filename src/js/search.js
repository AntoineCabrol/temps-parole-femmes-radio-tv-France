import $ from 'jquery';
import Rate from './rate';
import Ranking from './ranking';

export default class Search {
  constructor (ranking) {
    this.ranking = ranking;
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      searchInput: $('.js-search-input'),
      searchButton: $('.js-search-button'),
      media: $('.js-media'),
      search: $('.js-search'),
      searchTitle: $('.js-search-title'),
      searchResult: $('.js-search-result'),
    };
    this.medias = require('../json/medias.json');
  }

  initEvents () {
    this.$els.searchButton.click(() => this.init());
    this.$els.searchInput.keyup(() => this.init());
    $(document).on('click', '.js-media', this.chooseMedia.bind(this));
  }

  init () {
    console.log(this.media);
    this.$els.search.addClass('chosen chosen--searching');
    const searchedMedia = this.$els.searchInput.val();
    this.ranking.display(searchedMedia);
  }

  chooseMedia (e) {
    const currentTarget = $(e.currentTarget);
    const logo = currentTarget.find('img').attr('src');
    const name = currentTarget.attr('title');
    const type = currentTarget.attr('data-type');
    this.$els.search.removeClass('chosen--searching').addClass('chosen').attr('data-type', type);
    this.$els.searchTitle.html(`
      <div class="search__ranking-media search__ranking-media--radio js-media" title="${name}">
        <img src="${logo}" alt="${name}">
      </div>
      `);
    Rate.displayStats(undefined, name, type);
  }
}
