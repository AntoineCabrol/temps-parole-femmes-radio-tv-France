import $ from 'jquery';
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
    };
    this.medias = require('../json/medias.json');
    this.ranking = new Ranking();
  }

  initEvents () {
    this.$els.searchButton.click(() => this.init());
    this.$els.searchInput.keyup(() => this.init());
  }

  init () {
    let searchedMedia = this.$els.searchInput.val();
    this.ranking.display(searchedMedia);
  }
}
