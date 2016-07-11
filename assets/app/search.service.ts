import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

    constructor(private http: Http) { }
    
    getMapping() {
            const headers = new Headers({'Authorization':' DEVELOPMENT-Indexer', 'Accept': 'application/json', 'Content-Type': 'application/json'});
            return this.http.get('http://api.exiletools.com/index/_mapping/field/*?pretty', { headers: headers })
                            .map(response => response.json().poe20160607.mappings.item)
                            .catch(error => Observable.throw(error.json()));
    }

    //maybenot have aggregations DNO
    getSearchItemResult(query: string) {
            console.log("SEARCH QUERY BELOW (FROM SERVICE):");
            console.log(query);
            const headers = new Headers({'Authorization':' DEVELOPMENT-Indexer', 'Accept': 'application/json', 'Content-Type': 'application/json'});
            return this.http.post('http://api.exiletools.com/index/_search?pretty', query, { headers: headers })
                            .map(response => response.json())
                            .catch(error => Observable.throw(error.json()));
    }

    getSearchSkilltreeResult(query: string) {
            const headers = new Headers({'Authorization':' DEVELOPMENT-Indexer', 'Accept': 'application/json', 'Content-Type': 'application/json'});
            return this.http.post('http://api.exiletools.com/skilltrees/_search?pretty', query, { headers: headers })
                            .map(response => response.json())
                            .catch(error => Observable.throw(error.json()));
    }

}