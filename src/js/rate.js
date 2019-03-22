import $ from 'jquery';
import Navigation from './navigation';
import Timeline from './timeline';
import Ranking from './ranking';

export default class Rate {
  constructor (timeline) {
    this.initEls();
    Rate.timeline = timeline;
  }

  initEls () {
    Rate.$els = {
      radio: $('.js-radio'),
      radioRates: $('.js-radio-rates'),
      radioWomenRate: $('.js-radio-women-rate'),
      radioMenRate: $('.js-radio-men-rate'),
      tvWomenRate: $('.js-tv-women-rate'),
      tvMenRate: $('.js-tv-men-rate'),
      tv: $('.js-tv'),
      tvRates: $('.js-tv-rates'),
      choice: $('.js-choice-radio, .js-choice-tv, .js-choice-search'),
      choiceRadio: $('.js-choice-radio'),
      choiceTv: $('.js-choice-tv'),
      choiceSearch: $('.js-choice-search'),
      searchRates: $('.js-searched-rates'),
      searchWomenRate: $('.js-searched-women-rate'),
      searchMenRate: $('.js-searched-men-rate'),
    };
    Rate.data = require('../json/women_expression_rate_1995_2019_fr_radio_tv.json');
    Rate.radiosByDate = []; // stocke les objets filtrés par date
    Rate.radiosByName = []; // stocke les objets filtrés par nom de chaine/radio
    Rate.tvByDate = []; // stocke les objets filtrés par date
    Rate.tvByName = []; // stocke les objets filtrés par nom de chaine/radio
    Rate.yearsthiss = []; // stocke tous les ratios de l'année dans un tableau
    Rate.yearthis = ''; // moyenne du tableau pour affichage
    Rate.thiss = 0; // attribué à la largeur de la radio ou la tv
    Rate.womenthis = '';
    Rate.menthis = '';
  }

  static displayStats (date, name, type) {
    // console.log(`displayStats(${date}, ${name}, ${type})`);
    if (date === undefined) {
      console.log('New Timeline()');
      date = Rate.timeline.initDate();
    }
    // Remises à 0
    Rate.yearsRates = [];
    console.log('displayStats', this);
    // MEDIAS
    Rate.filter(date, name, type);
    // Calcul de la moyenne du tableau
    Rate.average();
  }

  static filter (date, name, type) {
    // Filtrage
    if (name === undefined) {
      Rate.filterAll(type, date);
    } else {
      Rate.filterSearched(type, date, name);
    }
    switch (type) {
      case 'radio':
      console.log('this filter', this)
        // Actualiser la timeline
        Rate.timeline.setStart(1995);
        // Création d'un tableau pour faire la moyenne
        Rate.radiosByDate.forEach((element) => Rate.yearsRates.push(element.women_expression_rate));
        // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
        Rate.rates = Rate.$els.radioRates;
        if (name !== undefined) {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          Rate.rates = Rate.$els.searchRates;
          // Choix des emplacements des textes à remplir
          Rate.womenRate = Rate.$els.searchWomenRate;
          Rate.menRate = Rate.$els.searchMenRate;
        }
        else {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          Rate.rates = Rate.$els.radioRates;
          // Choix des emplacements des textes à remplir
          Rate.womenRate = Rate.$els.radioWomenRate;
          Rate.menRate = Rate.$els.radioMenRate;
        }
        break;
      case 'tv':
        // Actualiser la timeline
        Rate.timeline.setStart(2010);
        // Création d'un tableau pour faire la moyenne
        Rate.tvByDate.forEach((element) => Rate.yearsRates.push(element.women_expression_rate));
        if (name !== undefined) {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          Rate.rates = Rate.$els.searchRates;
          // Choix des emplacements des textes à remplir
          Rate.womenRate = Rate.$els.searchWomenRate;
          Rate.menRate = Rate.$els.searchMenRate;
        }
        else {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          Rate.rates = Rate.$els.tvRates;
          // Choix des emplacements des textes à remplir
          Rate.womenRate = Rate.$els.tvWomenRate;
          Rate.menRate = Rate.$els.tvMenRate;
        }
        break;
      default:
        console.log('🍪');
    }
  }

  static filterAll (type, date) {
    // console.log(`filterAll(${type}, ${date})`);
    switch (type) {
      case 'radio':
        Rate.radiosByDate = Rate.data.radio.filter(obj => obj.year === date);
        Rate.$els.radio.addClass('chosen'); // Afficher les stats
        break;
      case 'tv':
        Rate.tvByDate = Rate.data.tv.filter(obj => obj.year === date);
        Rate.$els.tv.addClass('chosen'); // Afficher les stats
        break;
      default:
        console.log('🍪');
    }
  }

  static filterSearched (type, date, name) {
    // console.log(`filterSearched(${type}, ${date}, ${name})`);
    // Actualisation du filtre selon le type
    switch (type) {
      case 'radio':
        Rate.radiosByDate = Rate.data.radio.filter(obj => obj.year === date && obj.channel_name === name);
        break;
      case 'tv':
        Rate.tvByDate = Rate.data.tv.filter(obj => obj.year === date && obj.channel_name === name);
        break;
      default:
        console.log('🍪');
    }
  }

  static average () {
    let total = 0;
    let n = Rate.yearsRates.length;
    for (let i = 0; i < n; i++) total += Rate.yearsRates[i];
  	Rate.yearRate = Math.round(total / n);
    let womenWidth = (Rate.rates.width() * Rate.yearRate) / 100;
    Rate.womenRate.text(`${Rate.yearRate} %`).width(`${womenWidth}`);
    Rate.menRate.text(`${100 - Rate.yearRate} %`);
  }
}
