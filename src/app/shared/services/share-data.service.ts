import { Language } from './../../models/language.model';
import { User, Password } from './../../models/user.model';
import { ParticularFirstRequest } from './../../models/particularFirstRequest.model';
import { Professional } from './../../models/professional.model';
import { Injectable } from '@angular/core';
import { Demand } from '../../models/demand.model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }
  private pro: Professional;
  private demande: Demand;
  private user : User;
  private password : Password;
  private langue : Language [] ;
  private email = '';  
  setPro(value){
    this.pro = value;
  }
  getPro(){
    return this.pro;
  }

  setDemand(value){
    this.demande = value;
  }
  getDemand(){
    return this.demande;
  }
  setUser(value){
    this.user= value;
  }
  getUser(){
    return this.user;
  }
  setPassword(value){
    this.password= value;
  }
  getPassword(){
    return this.password;
  }
  setLang(value){
    this.langue= value;
  }
  getLang(){
    return this.langue;
  }
  setEmail(value) {  

    this.email = value;  
  }  
  
  getEmail() {  
    return this.email;  
  }  
}  

