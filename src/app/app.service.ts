import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

export interface InternalStateType {
  [key: string]: any;
}

@Injectable()
export class AppState {
  url: string
constructor(private http : Http){
this.url = 'https://geo.api.gouv.fr/communes?codePostal=zip&fields=code&format=json&geometry=centre'
}

search_word(term){
return this.http.get(this.url.replace("zip",term)).pipe(map(res => {
return res.json().map(item => {
return item
})
}))
}
  public _state: InternalStateType = { };

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}