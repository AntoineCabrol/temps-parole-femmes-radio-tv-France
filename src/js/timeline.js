import $ from 'jquery'; // va chercher dans node modules tout seul
import Rate from './rate';

export default class Timeline {
  constructor () {
    this.initEls();
    this.initEvents();
  }

  initEls () {
    this.$els = {
      timeline: $('.js-timeline'),
      timelineShow: $('.js-timeline-show'),
      timelineCurrent: $('.js-timeline-current'),
    };
    this.rate = null;
    this.yearChosen = 0;
  }

  initEvents () {
    this.initDate();
    this.refreshDate();
  }

  initDate () {
    this.$els.timelineShow.text(`${this.$els.timeline.val()}`); // Valeur de base
    return this.yearChosen = parseInt(this.$els.timeline.val(), 10);
  }

  refreshDate () {
    // Curseur qui suis en live
    this.$els.timeline.mousemove(() => {
      this.$els.timelineShow.text(`${this.$els.timeline.val()}`);
    });

    // Affichage effectif uniquement à l'arrêt du curseur
    this.$els.timeline.change(() => {
      this.yearChosen = parseInt(this.$els.timeline.val(), 10);
      this.rate = new Rate();
      this.rate.displayStats(this.yearChosen); // Envoi de la date à Rate
    });
  }
}
