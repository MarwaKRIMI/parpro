import { Injectable } from '@angular/core';

@Injectable()
export class LogoService {

    public getLogoPath(team: string, size: number) {
        const baseUrl = '../../../assets/img/logos/';
        switch (team) {
            case 'Bennwihr F.C.':
                return baseUrl + 'Bennwhir/bennwhir_' + size + 'x' + size + '.png';
            case 'Blotzheim A.S.':
                return baseUrl + 'Blotzheim/blotzheim_' + size + 'x' + size + '.png';
            case 'Berrwiller F.C.':
                return baseUrl + 'Berrwiller/berrwiller_' + size + 'x' + size + '.png';
            case 'Grandvillars F.C.':
                return baseUrl + 'Grandvillars/grandvillars_' + size + 'x' + size + '.png';
            case 'Cernay S.C.':
                return baseUrl + 'Cernay/cernay_' + size + 'x' + size + '.png';
            case 'Uffheim F.C.':
                return baseUrl + 'Uffheim/uffheim_' + size + 'x' + size + '.png';
            case 'Hagenthal-Wentwiller F.C.':
            case 'Hagenthal-Wentzwill':
            case 'Hagenthal Wentzwill.':
                return baseUrl + 'Hagenthal/hagenthal_' + size + 'x' + size + '.png';
            case 'Hirtzbach F.C.':
                return baseUrl + 'Hirtzbach/hirtzbach_' + size + 'x' + size + '.png';
            case 'Illzach A.S.I.M. 2':
                return baseUrl + 'Illzach/illzach_' + size + 'x' + size + '.png';
            case 'Illhaeusern F.C.':
                return baseUrl + 'Illhaeusern/illhaeusern_' + size + 'x' + size + '.png';
            case 'Kingersheim F.C.':
                return baseUrl + 'Kingersheim/kingersheim_' + size + 'x' + size + '.png';
            case 'Sierentz F.C.':
                return baseUrl + 'Sierentz/sierentz_' + size + 'x' + size + '.png';
            case 'Koetzingue A.S.L.':
                return baseUrl + 'Koetzingue/koetzingue_' + size + 'x' + size + '.png';
            case 'Sundhoffen A.S.':
                return baseUrl + 'Sundhoffen/sundhoffen_' + size + 'x' + size + '.png';
            case 'St Louis Neuweg F.C. 2':
            case 'Saint-Louis Neuweg F.C. 2':
                return baseUrl + 'Saint-Louis/saint_louis_' + size + 'x' + size + '.png';
            case 'Racing H.W. 96':
                return baseUrl + 'Holtzwihr/holtzwihr_' + size + 'x' + size + '.png';
            case 'Wittenheim U.S.':
            case 'Wittenheim U.S. 2':
                return baseUrl + 'Wittenheim/wittenheim_' + size + 'x' + size + '.png';
            case 'Colmar S.R.':
                return baseUrl + 'Colmar/colmar_' + size + 'x' + size + '.png';
            case 'Pfastatt F.C.':
                return baseUrl + 'Pfastatt/pfastatt_' + size + 'x' + size + '.png';
            case 'Kappelen F.C.':
                return baseUrl + 'Kappelen/kappelen_' + size + 'x' + size + '.png';
            case 'Hegenheim F.C.':
                return baseUrl + 'Hegenheim/hegenheim_' + size + 'x' + size + '.png';
            case 'Riedisheim F.C.':
                return baseUrl + 'Riedisheim/riedisheim_' + size + 'x' + size + '.png';
            case 'Burnhaupt Le Ht F.C.':
                return baseUrl + 'Burnhaupt/burnhaupt-le-Haut_' + size + 'x' + size + '.png';
            case 'Tagsdorf F.C. ':
                return baseUrl + 'Tagsdorf/tagsdorf_' + size + 'x' + size + '.png';
            case 'Bartenheim F.C.':
                return baseUrl + 'Bartenheim/bartenheim_' + size + 'x' + size + '.png';
            case 'Us Azzurri Mulhouse':
            case 'Azzurri Mulhouse U.S.':
            case 'Azzurri Mulhouse U.S':
                return baseUrl + 'Azzuri/azzuri_' + size + 'x' + size + '.png';
            case 'Huningue A.S':
            case 'Huningue A.S.':
                return baseUrl + 'Huningue/huningue_' + size + 'x' + size + '.png';
            case 'Kembs F.C.':
                return baseUrl + 'Kembs/kembs_' + size + 'x' + size + '.png';
            case 'Mulhouse R.C':
            case 'Mulhouse R.C.':
                return baseUrl + 'Racing_mulhouse/racing_mulhouse_' + size + 'x' + size + '.png';
            case 'Ballersdorf F.C.':
            case 'Ballersdorf EPA':
                return baseUrl + 'Ballersdorf/ballersdorf_' + size + 'x' + size + '.png';
            case 'Bantzenheim F.C.':
                return baseUrl + 'Bantzenheim/bantzenheim_' + size + 'x' + size + '.png';
            case 'Mulhouse Bourtzwiller C.S.':
            case 'Mulhouse Bourtz C.S.':
                return baseUrl + 'Bourtzwiller/bourtzwiller_' + size + 'x' + size + '.png';
            case 'Hirsingue U.S.':
                return baseUrl + 'Hirsingue/hirsingue_' + size + 'x' + size + '.png';
            case 'Mulhouse Real C.F.':
                return baseUrl + 'Real_mulhouse/realmulhouse_' + size + 'x' + size + '.png';
            case 'Merxheim F.C.':
                return baseUrl + 'Merxheim/merxheim_' + size + 'x' + size + '.png';
            case 'Altkirch F.C.':
            case 'Altkirch A.S.':
                return baseUrl + 'Altkirch/new_altkirch_' + size + 'x' + size + '.png';
            case 'Hagenbach EHB2016':
                return baseUrl + 'Hagenbach/hagenbach_' + size + 'x' + size + '.png';
            case 'Helfrantzkirch ASCCO ':
                return baseUrl + 'Helfrantzkirch/helfrantzkirch_' + size + 'x' + size + '.png';
            case 'Riespach A.S.':
                return baseUrl + 'Riespach/riespach_' + size + 'x' + size + '.png';
            case 'Carspach S.G.':
                return baseUrl + 'Carspach/carspach_' + size + 'x' + size + '.png';
            case 'Ottmarsheim S.C.':
                return baseUrl + 'Ottmarsheim/ottmarsheim_' + size + 'x' + size + '.png';
            case 'Habsheim F.C.':
                return baseUrl + 'Habsheim/habsheim_' + size + 'x' + size + '.png';
            case 'Mulhouse A.S.R.S.':
                return baseUrl + 'RedStar_mulhouse/redstar_' + size + 'x' + size + '.png';
            case 'Berrwiller A.S. 2':
            case 'Berrwiller A.S.':
                return baseUrl + 'Berrwiller/berwiller_' + size + 'x' + size + '.png';
            case 'Zillisheim S.S.':
                return baseUrl + 'Zillisheim/zillisheim_' + size + 'x' + size + '.png';
            case 'Montreux Sports':
                return baseUrl + 'Montreux/montreux_' + size + 'x' + size + '.png';
            case 'Raedersheim A.S.':
                return baseUrl + 'Raedersheim/raedersheim_' + size + 'x' + size + '.png';
            default:
                break;
        }
    }
}
