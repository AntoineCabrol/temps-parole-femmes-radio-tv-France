import '../sass/global.scss';
import Rate from './rate';
import Timeline from './timeline';
// import Search from './search';

class App {
  constructor () {
    this.initApp();
  }
  initApp () {
    this.Rate = new Rate();
    this.Timeline = new Timeline();
    // this.Search = new Search();
  }
}

new App();
