import '../sass/global.scss';
import Rate from './rate';
import Navigation from './navigation';
import Timeline from './timeline';
import Search from './search';
import Ranking from './ranking';

class App {
  constructor () {
    this.initApp();
  }
  initApp () {
    this.Timeline = new Timeline();
    this.Rate = new Rate(this.Timeline);
    this.Ranking = new Ranking();
    this.Search = new Search(this.Ranking);
    this.Navigation = new Navigation(this.Timeline, this.Search);
  }
}

new App();
