/// <reference path="../../typings.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchService } from './search.service';

bootstrap( AppComponent, [ HTTP_PROVIDERS, SearchService ] );