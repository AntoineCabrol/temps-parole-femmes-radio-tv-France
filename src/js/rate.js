import $ from 'jquery';
// import * from 'Chart.js';
import Timeline from './timeline';

export default class Rate {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      medias: $('.js-radio, .js-tv'),
      radio: $('.js-radio'),
      radioRates: $('.js-radio-rates'),
      radioWomenRate: $('.js-radio-women-rate'),
      radioMenRate: $('.js-radio-men-rate'),
      tvWomenRate: $('.js-tv-women-rate'),
      tvMenRate: $('.js-tv-men-rate'),
      tv: $('.js-tv'),
      tvRates: $('.js-tv-rates'),
      choice: $('.js-choice-radio, .js-choice-tv'),
      choiceRadio: $('.js-choice-radio'),
      choiceTv: $('.js-choice-tv'),
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
    this.$els.choice.click(() => {
      this.displayStats();
    });
  }

  displayStats (date) {
    let timeline = new Timeline();
    if (date === undefined) {
      date = timeline.initDate(); // default
    }
    // Remises à 0
    this.yearsRates = [];
    this.$els.medias.removeClass('chosen');
    // RADIO / TV
    if (this.$els.choiceRadio.is(':checked')) {
      // Ajustement 1ère borne timeline
      timeline.$els.timelineStart.text('1995');
      timeline.$els.timeline[0].setAttribute('min', '1995');
      // Filtrage
      this.radiosByDate = this.data.radio.filter(obj => obj.year === date);
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
    else if (this.$els.choiceTv.is(':checked')) {
      // Ajustement 1ère borne timeline
      timeline.$els.timelineStart.text('2010');
      timeline.$els.timeline[0].setAttribute('min', '2010');
      // Filtrage
      this.tvByDate = this.data.tv.filter(obj => obj.year === date);
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
    // Calcul de la moyenne du tableau
    let total = 0;
    let n = this.yearsRates.length;
    for (let i = 0; i < n; i++) { total += this.yearsRates[i]; }
  	this.yearRate = Math.round(total / n);
    let womenWidth = (this.rates.width() * this.yearRate) / 100;
    this.womenRate.text(`${this.yearRate} %`).width(`${womenWidth}`);
    this.menRate.text(`${100 - this.yearRate} %`);
  }
}
