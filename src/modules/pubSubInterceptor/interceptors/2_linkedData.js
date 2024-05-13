import syncFetch from 'sync-fetch';

window.whoiswho = {
    query: '',
    asSuggestion(query) {
        let result = syncFetch(`https://services.libis.be/search/wieiswie?query=${query}&token=eluna24`, {method: 'GET'}).json();
        return result.docs;
    },

    asLinkedData(query) {
        let result = syncFetch(`https://services.libis.be/search/wieiswie?query=${query}&token=eluna24`, {method: 'GET'}).json();
        return {linkedData: result.docs};
    }

}

pubSub.subscribe('before-summonSuggestURL', (reqRes) => {
    whoiswho.query = '';
    let summonUrl = new URL(reqRes.url);
    if (summonUrl.searchParams.has('q')) {
        whoiswho.query = summonUrl.searchParams.get('q');        
    } 
    
    return reqRes;
});

pubSub.subscribe('after-summonSuggestURL', (reqRes) => {  
    
    if (whoiswho.query !== '') {     
        reqRes.data = whoiswho.asSuggestion(whoiswho.query);
    }

    return reqRes;
});


pubSub.subscribe('before-linkedDataURL', (reqRes) => {    
    whoiswho.query = reqRes.data.ids.map(m => m['id'])[0] || '';
    return reqRes;
});

pubSub.subscribe('after-linkedDataURL', (reqRes) => {    
    reqRes.data = whoiswho.asLinkedData(whoiswho.query)    

    return reqRes;
});

pubSub.subscribe('before-pnxBaseURL', (reqRes) => {
    if (/originatingauthorid/.test(reqRes.params['q'])) {        
        let params = reqRes.params['q'].split(';').map(m => m.split(','));
        reqRes.params['q']=`any,contains,${params[0][2]}`      ;
        reqRes.params['scope']='lirias_profile';
        console.log(reqRes.params);
    }
    return reqRes;
});

pubSub.subscribe('after-pnxBaseURL', (reqRes) => {    
    return reqRes;
})