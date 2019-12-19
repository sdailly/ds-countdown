const jsdom = require("jsdom")
const dom = new jsdom.JSDOM("<div id='selector'></div>");
global.document = dom.window.document;
global.window = dom.window;
