/**
 * json-to-freemind@1.0.1
 * 
 * license: "MIT
 * https://github.com/Alino/json-to-freemind.git
*/

import xmldom from 'xmldom';
// import XMLSerializer from'xmldom';
import path from 'path';
import {toFreemind} from '../icons/freemindIconsMap';

export default function convert(json, jsonFileName) {
  let parsedJson;
  try { parsedJson = JSON.parse(json); }
  catch (err) { throw ('Error: invalid json'); }

  const parser = new xmldom.DOMParser();
  const serializer = new xmldom.XMLSerializer();
  const xmlWrapper = `<map version="1.0.1">
<!-- This file was generated from a JSON structure, using json-to-freemind. -->
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
</map>`;
  const xmlDoc = parser.parseFromString(xmlWrapper, 'text/xml');

  const recur = function recur(tree, runNumber, lastParentEl) {
    let parentEl;

    parentEl = xmlDoc.createElement('node');
    parentEl.setAttribute('TEXT', tree.name);

    if(tree.icons && tree.icons.length) {
      tree.icons.forEach((icon) => {
        const childEl = xmlDoc.createElement('icon');
        childEl.setAttribute('BUILTIN', toFreemind[icon]);
        parentEl.appendChild(childEl);
      });
    }

    if(tree.attributes.length) {
      tree.attributes.forEach((attribute) => {
        const childEl = xmlDoc.createElement('attribute');
        childEl.setAttribute('NAME', attribute[0]);
        childEl.setAttribute('VALUE', attribute[1]);
        parentEl.appendChild(childEl);
      });
    }

    if(tree.children && tree.children.length) {
      tree.children.forEach((child) => {
        recur(child, runNumber + 1, parentEl);
      });
    }

    if (runNumber > 0 && lastParentEl) {
      lastParentEl.appendChild(parentEl);
    }

    if (runNumber == 0) {
      xmlDoc.getElementsByTagName('map')[0].appendChild(parentEl);
    }
  }(parsedJson, 0);

  const output = serializer.serializeToString(xmlDoc);
  return output;
}
