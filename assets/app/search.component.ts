import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';

@Component({
    moduleId: module.id,
    selector: 'my-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

    mappings: any[] = [];

    constructor(private searchService: SearchService) { }

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
                             data => console.log(data),
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
        const query = `{
                    "query": {
                    "bool": {
                    "must": [
                        {
                        "term": {
                            "attributes.league": {
                            "value": "Prophecy"
                            }
                        }
                        },
                        {
                        "term": {
                            "attributes.rarity": {
                            "value": "Unique"
                            } 
                        }
                        },
                        {
                        "term": {
                            "shop.hasPrice": {
                            "value": "true"
                            }
                        }
                        }
                    ]
                    }
                },
                "aggs": {
                    "uniqueNames": {
                    "terms": {
                        "field": "info.fullName",
                        "size": 1000,
                        "order" : {
                        "avgPrice[50.0]" : "desc"
                        }
                    },
                    "aggs": {
                        "avgPrice": {
                        "percentiles": {
                            "field": "shop.chaosEquiv",
                            "percents": [
                            50
                            ]
                        }
                        }
                    }
                    }
                }, 
                size:0
        }`;
        this.getSearchSkilltreeResult(query);
        //this.getMapping();
        //console.log(this.searchService.query);
     }

}