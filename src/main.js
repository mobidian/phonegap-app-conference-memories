/* global window document f7 cordova StatusBar */

import 'whatwg-fetch';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Import F7
/* eslint-disable no-unused-vars */
import Framework7 from 'framework7';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue';

// Import Routes
import Routes from './routes';

// Import App
import App from './App';

// Import F7 iOS Theme Styles
/* eslint-disable global-require */
if (window.Framework7.prototype.device.ios) {
  const Framework7Theme =
    require('framework7/dist/css/framework7.ios.min.css');
  const Framework7ThemeColors =
    require('framework7/dist/css/framework7.ios.colors.min.css');
} else {
  /* OR for Material Theme: */
  const Framework7ThemeMaterial =
    require('framework7/dist/css/framework7.material.min.css');
  const Framework7ThemeColorsMaterial =
    require('framework7/dist/css/framework7.material.colors.min.css');
}

// Set up some useful globals
window.isMaterial = !window.Framework7.prototype.device.ios;
window.isiOS = window.Framework7.prototype.device.ios;

// Store
window.pictureStore = JSON.parse(localStorage.getItem('pictures')) || [];
window.loginTextStore = localStorage.getItem('user') ? 'Logout' : 'Login';

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

// Init App
new Vue({ // eslint-disable-line no-new
  el: '#app',
  template: '<app />',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    material: !window.Framework7.prototype.device.ios,
    routes: Routes,
    animateNavBackIcon: window.Framework7.prototype.device.ios,
    pushState: true,
    pushStateNoAnimation: true,
  },
  // Register App Component
  components: {
    app: App,
  },
});

// Ye olde Device Ready
document.addEventListener('deviceready', () => {
  // setup status bar color
  if (cordova.platformId == 'android') {
    // dark blue
    StatusBar.backgroundColorByHexString('#3381c1');
  }

  // Bind to the back button for Android
  document.addEventListener('backbutton', () => {
    f7.mainView.router.back();
  });
});
