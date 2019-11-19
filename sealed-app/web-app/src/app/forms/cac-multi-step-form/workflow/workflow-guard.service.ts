import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad, Route
} from '@angular/router';

import { CacWorkflowService } from './workflow.service';

@Injectable()
export class CacWorkflowGuard implements CanActivate {

    url : string;
    
    constructor(private router: Router, private workflowService: CacWorkflowService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let path: string = route.routeConfig.path;
        
       this.url = state.url;
        return this.verifyWorkFlow(path);
    }

    verifyWorkFlow(path) : boolean {
        console.log("Entered '" + path + "' path.");

        // If any of the previous steps is invalid, go back to the first invalid step
        let firstPath = this.workflowService.getFirstInvalidStep(path);
        if (firstPath.length > 0) {
            console.log("Redirected to '" + firstPath + "' path which it is the first invalid step.");
            let url = `cac/${firstPath}`;
            this.router.navigate([url]);
            return false;
        };

        return true;
    }
}





