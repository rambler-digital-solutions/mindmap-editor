import jsonToFreemind from './json-to-freemind/';
import { saveAs } from 'file-saver';

export default class Exporter {
    exportFreemind(jsonInput, fileName = 'test') {
        const mindMapOutput = jsonToFreemind.convert(jsonInput, 'test.json');
        console.log('mindMapOutput: ', mindMapOutput);

        const blob = new Blob([mindMapOutput]);
        saveAs(blob, `${fileName}.json`);
    }
}