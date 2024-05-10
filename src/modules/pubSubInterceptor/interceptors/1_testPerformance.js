//document.addEventListener('pubSubInterceptorsReady', (e) => {

let testPerformanceStart;

pubSub.subscribe('before-pnxBaseURL', (reqRes) => {
    testPerformanceStart = performance.now();
    document.querySelector('measure-search').innerHTML = '.'
    document.querySelector('measure-search').classList.add('busy')
    document.querySelector('measure-search').classList.remove('performance')
    return reqRes;
} );

pubSub.subscribe('after-pnxBaseURL', (reqRes) => {
    document.querySelector('measure-search').classList.remove('busy')    
    document.querySelector('measure-search').classList.add('performance')
    document.querySelector('measure-search').innerHTML = Math.ceil(performance.now() - testPerformanceStart);    
    return reqRes;
} );
//});