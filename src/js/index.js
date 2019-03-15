import '../sass/global.scss';
import Rate from './rate';
import Timeline from './timeline';

class App {
  constructor () {
    this.initApp();
  }
  initApp () {
    this.Rate = new Rate();
    this.Timeline = new Timeline();
  }
}

new App();
