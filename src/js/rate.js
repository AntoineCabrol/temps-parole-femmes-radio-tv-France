import $ from 'jquery';
// import * from 'Chart.js';
import Timeline from './timeline';
import Search from './search';

export default class Rate {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      medias: $('.js-radio, .js-tv, .js-search'),
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
      search: $('.js-search'),
      choiceSearch: $('.js-choice-search'),
    };
    this.data = require('../json/women_expression_rate_1995_2019_fr_radio_tv.json');
    this.radiosByDate = []; // stocke les objets filtrés par date
    this.radiosByName = []; // stocke les objets filtrés par nom de chaine/radio
    this.tvByDate = []; // stocke les objets filtrés par date
    this.tvByName = []; // stocke les objets filtrés par nom de chaine/radio
    this.yearsRates = []; // stocke tous les ratios de l'année dans un tableau
    this.yearRate = ''; // moyenne du tableau pour affichage
    this.timeline = null;
    this.rates = 0; // attribué à la largeur de la radio ou la tv
    this.womenRate = '';
    this.menRate = '';
  }

  initEvents () {
    this.displayStats();
    this.$els.choice.click(() => this.displayStats());
  }

  displayStats (date, name) {
    let timeline = new Timeline();
    if (date === undefined) {
      date = timeline.initDate(); // default
    }
    name = 'France Bleu';
    // Remises à 0
    this.yearsRates = [];
    this.$els.medias.removeClass('chosen');
    // MEDIAS
    if (this.$els.choiceRadio.is(':checked')) this.filterRadios(date, name);
    else if (this.$els.choiceTv.is(':checked')) this.filterTv(date, name);
    else if (this.$els.choiceSearch.is(':checked')) this.filterSearch(date, name);
    // Calcul de la moyenne du tableau
    this.average();
  }

  average () {
    let total = 0;
    let n = this.yearsRates.length;
    for (let i = 0; i < n; i++) total += this.yearsRates[i];
  	this.yearRate = Math.round(total / n);
    let womenWidth = (this.rates.width() * this.yearRate) / 100;
    this.womenRate.text(`${this.yearRate} %`).width(`${womenWidth}`);
    this.menRate.text(`${100 - this.yearRate} %`);
  }

  filterRadios (date, name) {
    let timeline = new Timeline();
    // Ajustement 1ère borne timeline
    timeline.$els.timelineStart.text('1995');
    timeline.$els.timeline[0].setAttribute('min', '1995');
    // Filtrage
    if (name === undefined) {
      this.filterAll('radio', date);
    } else {
      this.filterSearched('radio', date, name);
    }
    // Création d'un tableau pour faire la moyenne
    this.radiosByDate.forEach((element) => this.yearsRates.push(element.women_expression_rate));
    // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
    this.rates = this.$els.radioRates;
    // Choix des emplacements des textes à remplir
    this.womenRate = this.$els.radioWomenRate;
    this.menRate = this.$els.radioMenRate;
    // Afficher les stats
    this.$els.radio.addClass('chosen');
  }

  filterTv (date, name) {
    let timeline = new Timeline();
    // Ajustement 1ère borne timeline
    timeline.$els.timelineStart.text('2010');
    timeline.$els.timeline[0].setAttribute('min', '2010');
    // Filtrage
    if (name === undefined) {
      this.filterAll('tv', date);
    } else {
      this.filterSearched('tv', date, name);
    }
    // Création d'un tableau pour faire la moyenne
    this.tvByDate.forEach((element) => this.yearsRates.push(element.women_expression_rate));
    // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
    this.rates = this.$els.tvRates;
    // Choix des emplacements des textes à remplir
    this.womenRate = this.$els.tvWomenRate;
    this.menRate = this.$els.tvMenRate;
    // Afficher les stats
    this.$els.tv.addClass('chosen');
  }

  filterSearch (date, name) {
    // Afficher les stats
    this.$els.search.addClass('chosen');
  }

  filterAll (type, date) {
    console.log(`filterAll(${type}, ${date}, ${name})`);
    switch (type) {
      case 'radio':
        this.radiosByDate = this.data.radio.filter(obj => obj.year === date);
        break;
      case 'tv':
        this.tvByDate = this.data.tv.filter(obj => obj.year === date);
        break;
      default:
        console.log('No media selected..');
    }
  }

  filterSearched (type, date, name) {
    console.log(`filterSearched(${type}, ${date}, ${name})`);
    switch (type) {
      case 'radio':
        this.radiosByDate = this.data.radio.filter(obj => obj.year === date && obj.channel_name === name);
        break;
      case 'tv':
        this.tvByDate = this.data.tv.filter(obj => obj.year === date && obj.channel_name === name);
        break;
      default:
        console.log('No media selected..');
    }
  }
}
