import '../sass/global.scss';
import JsonUse from './JsonUse';

class App {
  constructor () {
    this.initApp();
  }
  initApp () {
    this.JsonUse = new JsonUse();
  }
}

new App();
