import $ from 'jquery'; // va chercher dans node modules tout seul
import Timeline from './timeline';

export default class Rate {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      radio: $('.js-radio'),
      radioWomenRate: $('.js-radio-women-rate'),
      radioMenRate: $('.js-radio-men-rate'),
      tvWomenRate: $('.js-tv-women-rate'),
      tvMenRate: $('.js-tv-men-rate'),
      tv: $('.js-tv'),
      choice: $('.js-choice-radio, .js-choice-tv'),
      choiceRadio: $('.js-choice-radio'),
      choiceTv: $('.js-choice-tv'),
    };
    this.data = require('../json/women_expression_rate_1995_2019_fr_radio_tv.json');
    this.radiosByDate = []; // stocke les objets filtrés par date
    this.radiosByName = []; // stocke les objets filtrés par nom de chaine/radio
    this.yearsRates = []; // stocke tous les ratios de l'année dans un tableau
    this.yearRate = ''; // moyenne du tableau pour affichage
    this.timeline = null;
    this.womenRate = '';
    this.menRate = '';
  }

  initEvents () {
    this.displayStats();
    this.$els.choice.click(() => {
      this.displayStats();
      console.log("Clic radio/tv");
    });
  }

  displayStats (date) {
    if (date === undefined) {
      this.timeline = new Timeline();
      date = this.timeline.initDate(); // default
    }
    this.yearsRates = []; // remise à 0
    if (this.$els.choiceRadio.is(':checked')) {
      // Filtrage
      this.radiosByDate = this.data.radio.filter(obj => obj.year === date);
      // Création d'un tableau pour faire la moyenne
      this.radiosByDate.forEach((element) => this.yearsRates.push(element.women_expression_rate));
      // Choix des emplacements des textes à remplir
      this.womenRate = this.$els.radioWomenRate;
      this.menRate = this.$els.radioMenRate;
    }
    else if (this.$els.choiceTv.is(':checked')) {
      this.radiosByName = this.data.radio.filter(obj => obj.channel_name === 'Chérie FM');
      // Création d'un tableau pour faire la moyenne
      this.radiosByName.forEach((element) => this.yearsRates.push(element.women_expression_rate));
      // Choix des emplacements des textes à remplir
      this.womenRate = this.$els.tvWomenRate;
      this.menRate = this.$els.tvMenRate;
    }
    // Calcul de la moyenne du tableau
    let total = 0;
    let n = this.yearsRates.length;
    for (let i = 0; i < n; i++) {
  		total += this.yearsRates[i];
  	}
  	this.yearRate = Math.round(total / n);
    this.womenRate.text(`${this.yearRate} % en ${date}`);
    this.menRate.text(`${100 - this.yearRate} % en ${date}`);
  }
}
