import $ from 'jquery';
import Rate from './rate';

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
    this.medias = ['Chérie FM', 'Europe 1', 'France Bleu', 'France Culture', 'France Info', 'France Inter', 'France Musique', 'Fun Radio', 'Mouv’', 'NRJ', 'Nostalgie', 'RFM', 'RMC', 'RTL', 'RTL 2', 'Radio Classique', 'Radio France Internationale', 'Rire et Chansons', 'Skyrock', 'Sud Radio', 'Virgin Radio', 'Arte', 'Animaux', 'BFM TV', 'Canal+', 'Canal+ Sport', 'Chasse et pêche', 'Chérie 25', 'Comédie+', 'D8/C8', 'Euronews', 'Eurosport France', 'France 2', 'France 24', 'France 3', 'France 5', 'France O', 'Histoire', 'I-Télé/CNews', 'L\'Equipe 21', 'LCI', 'LCP/Public Sénat', 'La chaîne Météo', 'M6', 'Monte Carlo TMC', 'NRJ 12', 'Paris Première', 'Planète+', 'TF1', 'TV Breizh', 'TV5 Monde', 'Toute l\'Histoire', 'Téva', 'Voyage', 'W9'];
  }

  initEvents () {
    this.$els.searchButton.click(() => this.init());
  }

  init () {
    let searchedMedia = this.$els.searchInput.val();
    let rate = new Rate();
    rate.displayStats(undefined, searchedMedia);
  }
}
