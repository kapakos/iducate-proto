import 'babel-polyfill';
import 'mock-local-storage';
import js from 'jsdom';
import { expect } from 'chai';
import sinon from 'sinon';

const jsdom = js.jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

global.expect = expect;
global.sinon = sinon;
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

const documentRef = document;
