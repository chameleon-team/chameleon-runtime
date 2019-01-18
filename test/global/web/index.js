/**
 * 简单模拟web环境，仅解决到调用层面，测试方法到方法调用。
 * 以及模拟人眼看到的情况，用于测试
 */
var Vue = require('vue');
var testConfig = require('./config');
var visible = require('./visible');
var document = require('./document');
var navigator = require('./navigator');
var location = require('./location');
var localStorage = require('./localStorage');
var window = require('./window');
var fetch = require('./fetch');
var Event = require('./Event');

// 放到global，模拟环境
process.env.platform = 'web';
global.testConfig = testConfig;
global.visible = visible;
global.document = document;
global.navigator = navigator;
global.location = location;
global.window = window;
global.localStorage = localStorage;
global.fetch = fetch;
global.Vue = Vue
global.Event = Event
