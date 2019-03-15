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
    this.medias = [];
  }

  initEvents () {
    this.init();
    this.check();
  }

  init () {
    this.medias = ["Chérie FM", "Europe 1", "France Bleu", "France Culture", "France Info", "France Inter", "France Musique", "Fun Radio", "Mouv’", "NRJ", "Nostalgie", "RFM", "RMC", "RTL", "RTL 2", "Radio Classique", "Radio France Internationale", "Rire et Chansons", "Skyrock", "Sud Radio", "Virgin Radio", "Arte", "Animaux", "BFM TV", "Canal+", "Canal+ Sport", "Chasse et pêche", "Chérie 25", "Comédie+", "D8/C8", "Euronews", "Eurosport France", "France 2", "France 24", "France 3", "France 5", "France O", "Histoire", "I-Télé/CNews, "L\'Equipe 21", "LCI", "LCP/Public Sénat", "La chaîne Météo", "M6", "Monte Carlo TMC", "NRJ 12", "Paris Première", "Planète+", "TF1", "TV Breizh", "TV5 Monde", "Toute l'Histoire", "Téva", "Voyage", "W9"];

    this.$els.searchInput.typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'this.medias',
      source: substringMatcher(this.medias)
    });
  }

  check () {
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
        cb(matches);
      };
    };
  }

}
