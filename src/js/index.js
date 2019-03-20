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
    this.Rate = new Rate();
    this.Ranking = new Navigation();
    this.Timeline = new Timeline();
    this.Search = new Search();
    this.Ranking = new Ranking();
  }
}

new App();
