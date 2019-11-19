import { Injectable } from '@angular/core';

@Injectable()
export class NetworkProvider 
{
    status:string = "Disconnected";
    constructor(
    ){
        this.checkNetwork();
    }

    checkNetwork = () :void =>
    {
        if(navigator.onLine) 
        {
            // Update the online status icon based on connectivity
            window.addEventListener('online',  this.checkStatus);
            window.addEventListener('offline', this.checkStatus);
            this.checkStatus();
        }
    }

    private checkStatus = () =>
    {
        this.status = (navigator.onLine) ? 'Connected' : "Disconnected";
    }
}