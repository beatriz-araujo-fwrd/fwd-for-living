import { testScript } from './test.js';
import { mainInit } from './main.js';
import { homepage } from './homepage.js';
import { navBarMenu } from './menu.js';
import { form } from './form.js';
import { footerDate } from './footer-date.js';
import { swiperInit } from './swiper.js';
import { caseTransition } from './case-transition.js';

console.log("v2 UPDATE TEST: This is coming from the main-script-loader.js");

testScript();
mainInit();
homepage();
navBarMenu();
form();
footerDate();
swiperInit();
caseTransition();