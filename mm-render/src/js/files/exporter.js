import convert from './json-to-freemind';
import { saveAs } from 'file-saver';

export default class Exporter {
    exportFreemind(jsonInput, fileName = 'test') {
        const mindMapOutput = convert(jsonInput, 'test.mm');
        const blob = new Blob([mindMapOutput]);
        saveAs(blob, `${fileName}.mm`);
    }
}