import measureSearchHTML from './measureSearch.html';

class MeasureSearchController {
    constructor() {
        console.log('constructor measure-search');
    }
 }
 
 export let measureSearchComponent = {
    name: 'measure-search',
    config: {
        bindings: {parentCtrl: '<'},
        controller: MeasureSearchController,
        template: measureSearchHTML
    },
    enabled: true,
    appendTo: 'prm-top-bar-before',
    enableInView: '.*'
 }
 
 