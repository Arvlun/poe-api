import{ Component } from '@angular/core';

import { SearchComponent } from './search.component';
import { ResultComponent } from './result.component';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [
        SearchComponent,
        ResultComponent
    ]
})
export class AppComponent {

}