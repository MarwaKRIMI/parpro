import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frDate'
})
export class FrDatePipeComponent implements PipeTransform {
  private timeSeparator = 'h';

  public transform(value, args) {
    if (value == null || value === undefined) {
      return '';
    }

    const match = value.match(/^(\d+)-(\d+)-(\d+)T(\d+)\:(\d+)\:(\d+)$/);
    const myDate = new Date(
      match[1],
      match[2] - 1,
      match[3],
      match[4],
      match[5],
      match[6]
    );

    // HHmm
    if (args === 'time') {
      return (
        this.padStr(myDate.getHours()) +
        this.timeSeparator +
        this.padStr(myDate.getMinutes().toString())
      );
    }
    if (args === 'shortTime') {
      return (
        this.padStr(myDate.getHours()) +
        this.timeSeparator +
        this.padStr(myDate.getMinutes().toString())
      );
    }
    if (args === 'dd/MM/yyyy') {
      return (
        this.padStr(myDate.getDate()) +
        '/' +
        this.padStr(myDate.getMonth() + 1) +
        '/' +
        this.padStr(myDate.getFullYear())
      );
    }
    if (args === 'dd/MM') {
      return (
        this.padStr(myDate.getDate()) + '/' + this.padStr(myDate.getMonth() + 1)
      );
    }
    if (args === 'shortDate') {
      return (
        this.getShortFrDay(myDate.getDay()) +
        ' ' +
        this.padStr(myDate.getDate()) +
        ' ' +
        this.getShortFrMonth(myDate.getMonth())
      );
    }
    if (args === 'longDate') {
      return (
        this.getFrDay(myDate.getDay()) +
        ' ' +
        this.padStr(myDate.getDate()) +
        ' ' +
        this.getFrMonth(myDate.getMonth())
      );
    }
    if (args === 'longDateTime') {
      return (
        this.getFrDay(myDate.getDay()) +
        ' ' +
        this.padStr(myDate.getDate()) +
        ' ' +
        this.getFrMonth(myDate.getMonth()) +
        ' ' +
        this.padStr(myDate.getHours()) +
        this.timeSeparator +
        this.padStr(myDate.getMinutes().toString())
      );
    } else {
      return value;
    }
  }

  private getShortFrDay(day: number) {
    switch (day) {
      case 1:
        return 'Lun';
      case 2:
        return 'Mar';
      case 3:
        return 'Mer';
      case 4:
        return 'Jeu';
      case 5:
        return 'Ven';
      case 6:
        return 'Sam';
      case 0:
        return 'Dim';
      default:
        return 'Error';
    }
  }

  private getFrDay(day: number) {
    switch (day) {
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
      case 0:
        return 'Dimanche';
      default:
        return 'Error';
    }
  }

  private padStr(i) {
    return i < 10 ? '0' + i : '' + i;
  }

  private getShortFrMonth(month: number) {
    switch (month) {
      case 0:
        return 'Jan';
      case 1:
        return 'Fév';
      case 2:
        return 'Mar';
      case 3:
        return 'Avr';
      case 4:
        return 'Mai';
      case 5:
        return 'Jun';
      case 6:
        return 'Jui';
      case 7:
        return 'Aou';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Déc';
      default:
        return 'Error';
    }
  }

  private getFrMonth(month: number) {
    switch (month) {
      case 0:
        return 'janvier';
      case 1:
        return 'février';
      case 2:
        return 'mars';
      case 3:
        return 'avril';
      case 4:
        return 'mai';
      case 5:
        return 'juin';
      case 6:
        return 'juillet';
      case 7:
        return 'août';
      case 8:
        return 'septembre';
      case 9:
        return 'octobre';
      case 10:
        return 'novembre';
      case 11:
        return 'décembre';
      default:
        return 'Error';
    }
  }
}
