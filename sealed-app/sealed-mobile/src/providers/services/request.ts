import { Injectable } from '@angular/core';
import { url } from '../../config/config';
import { NetworkProvider } from './network';
import { StorageProvider } from './storage';
declare var $: any;

@Injectable()

export class RequestProvider
{
  jwt:string = sessionStorage.getItem("token");;
  headers:any = null;
  constructor(
    private net: NetworkProvider,
    private storage: StorageProvider
  ) { 
  }

  getRequest = async (routes:string):Promise<any> => {
    return await new Promise((resolve, reject) => {
      try
      {
        $.ajax({
          url: encodeURI(url + routes),
          type: "GET",
          headers: {
              'Authorization':'Bearer '+ this.jwt,
              'Content-Type':'application/json'
          },
          async: true,
          crossDomain: true,
          success: (res: any) => { 
            resolve(res);
          },
          error: (err: any, status: any, error: any) => {
            if(status == "error" && this.net.status == "Disconnected"){
              reject({
                error: "No internet connection"
              });
            } else {
              reject(err.responseJSON)
            }
          }
        });
      } catch(ex)
      {
        reject(JSON.stringify({
          "error": "error",
          "response": "cannot complete get request"
        }))
      }
    })
  }

  postRequest = async (routes: string, data):Promise<any> => 
  {
    return await new Promise((resolve, reject) => {
      try
      {
        $.ajax({
          url: encodeURI(url + routes),
          type: "POST",
          headers: {
              'Authorization':'Bearer '+ this.jwt,
              'Content-Type':'application/json'
          },
          async: true,
          crossDomain: true,
          success: (res: any) => { 
            resolve(res);
          },
          data: data,
          error: (err: any, status: any, error: any) => {
            if(status == "error" && this.net.status == "Disconnected"){
              reject({
                error: "No internet connection"
              });
            } else {
              reject(err.responseJSON)
            }
          }
       });
      }
      catch(ex)
      {
        reject(JSON.stringify({
          "error": "error",
          "response": "cannot complete post request"
        }))
      }
    })
  };

  updateRequest = async (routes: string, data):Promise<any> => 
  {
    return await new Promise((resolve, reject) => {
      try
      {
        data = this.transformRequest(data);
        $.ajax({
          url: encodeURI(url + routes),
          data: data,
          type: "PUT",
          async: true,
          crossDomain: true,
          headers: {
              'Authorization':'Bearer '+ this.jwt,
              'Content-Type':'application/json'
          },
          success: (res: any) => { 
            resolve(res);
          },
          error: (err: any, status: any, error: any) => {
            if(status == "error" && this.net.status == "Disconnected"){
              reject({
                error: "No internet connection"
              });
            } else {
              reject(err.responseJSON)
            }
          }
       });
      }
      catch(ex)
      {
        reject(JSON.stringify({
          "error": "error",
          "response": "cannot complete update request"
        }))
      }
    });
  }

  deleteRequest = async (routes: string):Promise<any> => 
  {
    return await new Promise((resolve, reject) => {
      try
      {
        return fetch(encodeURI(url + routes), {
          method: 'delete',
          headers: {
            "cache-control": "no-cache",
            "Accept-language": "en",
            "Authorization": "Bearer " + this.jwt
          },
        })
        .then(response => resolve(response.json())) // parses response to JSON
        .catch(error => reject(JSON.stringify({
          "message": "failed",
          "error": "update delete failed"
        })));
      }
      catch(ex)
      {
        reject(JSON.stringify({
          "error": "error",
          "response": "cannot complete delete request"
        }))
      }
    });
  }

  uploadFile = (route: string, form: FormData):any => {
    return this.postRequest(route + "/files", form);
  }

  private transformRequest(obj)
  {
      var $res = [];
      for(var key in obj)
      {
          $res.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return $res.join('&');
  }

  private saveRequest(routes: string, data: any) {

    return data;
  }

  private getIfNetworkIsDisconnected(routes: string, data: any) {
    return data;
  }

}
