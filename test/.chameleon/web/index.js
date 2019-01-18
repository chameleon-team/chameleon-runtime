import { createApp } from './src/interfaces/createApp/index.js'
import { createPage } from './src/interfaces/createPage/index.js'
import { createComponent } from './src/interfaces/createComponent/index.js'
import bootstrap from './src/interfaces/bootstrap/index.js';

export default {
  createApp,
  createPage,
  createComponent,
  ...bootstrap
}
