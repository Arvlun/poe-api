import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';

@Component({
    moduleId: module.id,
    selector: 'my-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

    mappings: any[] = [];
    jsondata: string;
    querymain = { "query": {
            
        }
    }; 
    bool = {
        "bool": {
                "must":  [

                ]
        }
    };
    size = { size: 50 };


    constructor(private searchService: SearchService) { }

    createTerm(field: string, value: string) {
        var tempterm = {
            "term": {
            }
        };
        tempterm.term[field] = { "value": value };
        //console.log(tempterm);
        return tempterm;
    }

    createRange(field: string, min: any, max: any) {
        var tempterm = {
            "range": {
            }
        };
        //var temprange = {
        //};

        //temprange['gte'] = { min };
        //temprange['lte'] = { max };
        tempterm.range[field] = { 'gte' : min ,  'lte' : max };
        //tempterm.range[field]
        console.log(tempterm);
        return tempterm;
    }
    

    getMapping() {
        this.searchService.getMapping()
                          .subscribe(
                             data => { 
                                 for (var key in data) {
                                     this.mappings.push(key);
                                 };
                             },
                             error => console.log(error) 
                          );
    }

    getSearchItemResult(query: string) {
        this.searchService.getSearchItemResult(query)
                          .subscribe(
                             data => {
                                 console.log(data);
                                 this.mappings = data.hits.hits;
                             },
                             error => console.log(error) 
                          );
    }

    getSearchSkilltreeResult(query: string) {
        this.searchService.getSearchSkilltreeResult(query)
                          .subscribe(
                             data => console.log(data),
                             error => console.log(error) 
                          );
    }



    ngOnInit() {
        this.querymain.query = this.bool;
        this.querymain.query.bool.must.push(this.createTerm('attributes.league', 'Prophecy'));
        //this.querymain.query.bool.must.push(this.createTerm('attributes.rarity', 'Unique'));
        //this.querymain.query.bool.must.push(this.createTerm('info.fullName', "Hellion's Paw"));
        this.querymain.query.bool.must.push(this.createTerm('shop.hasPrice', "true"));
        this.querymain.query.bool.must.push(this.createRange('properties.Weapon.Elemental DPS', 200, 300));
        //this.createRange('properties.Weapon.Elemental', 10, 300);
        console.log(this.querymain);
        const testquery = (JSON.stringify(this.querymain, null, 2));
        this.getSearchItemResult(testquery);
     }

}