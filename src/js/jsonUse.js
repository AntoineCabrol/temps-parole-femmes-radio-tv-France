import $ from 'jquery'; // va chercher dans node modules tout seul

export default class JsonUse {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      radio: $('.js-radio'),
      tv: $('.js-tv'),
      choiceRadio: $('.js-choice-radio'),
      choiceTv: $('.js-choice-tv'),
    };
    this.data = require('../json/women_expression_rate_1995_2019_fr_radio_tv.json');
    this.radiosByDate = []; // stocke les objets filtrés par date
    this.radiosByName = []; // stocke les objets filtrés par nom de chaine/radio
    this.yearsRates = []; // stocke tous les ratios de l'année dans un tableau
    this.yearRate; // moyenne du tableau pour affichage
  }

  initEvents () {
    this.radiosByDate = this.data.radio.filter(this.filterByDate);
    this.radiosByName = this.data.radio.filter(this.filterByName);
    this.display();
  }

  filterByDate (obj) { return obj.year === 2002; }
  filterByName (obj) { return obj.channel_name === 'Chérie FM'; }

  display () {
    this.$els.choiceRadio.click(() => {
      this.radiosByDate.forEach((element) => {
        this.yearsRates.push(element.women_expression_rate); // Ajoute chaque moyenne au tableau
      });
      // Calcul de la moyenne du tableau
      let total = 0;
      let n = this.yearsRates.length;
    	for (let i = 0; i < n; i++) {
    		total += this.yearsRates[i];
    	}
    	this.yearRate = Math.round(total / n);
      this.$els.radio.text(`${this.yearRate} % en 2002`);
    });
  }
}
