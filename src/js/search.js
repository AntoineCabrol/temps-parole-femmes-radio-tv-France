import $ from 'jquery';
import Rate from './rate';
import Ranking from './ranking';

export default class Search {
  constructor () {
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
    this.rate = new Rate();
    this.ranking = new Ranking();
  }

  initEvents () {
    this.$els.searchButton.click(() => this.init());
    this.$els.searchInput.keyup(() => this.init());
    $(document).on('click', '.js-media', this.chooseMedia);
  }

  init () {
    this.$els.search.addClass('chosen chosen--searching');
    const searchedMedia = this.$els.searchInput.val();
    this.ranking.display(searchedMedia);
  }

  chooseMedia () {
    $('.search').removeClass('chosen--searching');
    const rate = new Rate();
    const logo = $(this).find('img').attr('src');
    const name = $(this).attr('title');
    const type = $(this).attr('data-type');
    $('.js-search').addClass('chosen').attr('data-type', type);
    $('.js-search-title').html(`
      <div class="search__ranking-media search__ranking-media--radio js-media" title="${name}">
        <img src="${logo}" alt="${name}">
      </div>
      `);
    rate.displayStats(undefined, name, type);
  }
}
