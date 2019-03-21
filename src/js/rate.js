import $ from 'jquery';
import Navigation from './navigation';
import Timeline from './timeline';
import Ranking from './ranking';

export default class Rate {
  constructor () {
    this.initEls();
  }

  initEls () {
    this.$els = {
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

  displayStats (date, name, type) {
    // console.log(`displayStats(${date}, ${name}, ${type})`);
    if (date === undefined) {
      const timeline = new Timeline();
      date = timeline.initDate();
    }
    // Remises à 0
    this.yearsRates = [];
    // MEDIAS
    this.filter(date, name, type);
    // Calcul de la moyenne du tableau
    this.average();
  }

  filter (date, name, type) {
    // Filtrage
    if (name === undefined) {
      this.filterAll(type, date);
    } else {
      this.filterSearched(type, date, name);
    }
    let timeline = new Timeline();
    switch (type) {
      case 'radio':
        // Actualiser la timeline
        timeline.setStart(1995);
        // Création d'un tableau pour faire la moyenne
        this.radiosByDate.forEach((element) => this.yearsRates.push(element.women_expression_rate));
        // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
        this.rates = this.$els.radioRates;
        if (name !== undefined) {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          this.rates = this.$els.searchRates;
          // Choix des emplacements des textes à remplir
          this.womenRate = this.$els.searchWomenRate;
          this.menRate = this.$els.searchMenRate;
        }
        else {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          this.rates = this.$els.radioRates;
          // Choix des emplacements des textes à remplir
          this.womenRate = this.$els.radioWomenRate;
          this.menRate = this.$els.radioMenRate;
        }
        break;
      case 'tv':
        // Actualiser la timeline
        timeline.setStart(2010);
        // Création d'un tableau pour faire la moyenne
        this.tvByDate.forEach((element) => this.yearsRates.push(element.women_expression_rate));
        if (name !== undefined) {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          this.rates = this.$els.searchRates;
          // Choix des emplacements des textes à remplir
          this.womenRate = this.$els.searchWomenRate;
          this.menRate = this.$els.searchMenRate;
        }
        else {
          // Sélectionner le parent dans le DOM pour récupérer ensuite sa largeur
          this.rates = this.$els.tvRates;
          // Choix des emplacements des textes à remplir
          this.womenRate = this.$els.tvWomenRate;
          this.menRate = this.$els.tvMenRate;
        }
        break;
      default:
        console.log('🍪');
    }
  }

  filterAll (type, date) {
    // console.log(`filterAll(${type}, ${date})`);
    switch (type) {
      case 'radio':
        this.radiosByDate = this.data.radio.filter(obj => obj.year === date);
        this.$els.radio.addClass('chosen'); // Afficher les stats
        break;
      case 'tv':
        this.tvByDate = this.data.tv.filter(obj => obj.year === date);
        this.$els.tv.addClass('chosen'); // Afficher les stats
        break;
      default:
        console.log('🍪');
    }
  }

  filterSearched (type, date, name) {
    // console.log(`filterSearched(${type}, ${date}, ${name})`);
    // Actualisation du filtre selon le type
    switch (type) {
      case 'radio':
        this.radiosByDate = this.data.radio.filter(obj => obj.year === date && obj.channel_name === name);
        break;
      case 'tv':
        this.tvByDate = this.data.tv.filter(obj => obj.year === date && obj.channel_name === name);
        break;
      default:
        console.log('🍪');
    }
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
}
