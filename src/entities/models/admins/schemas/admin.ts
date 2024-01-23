import { Base } from "../../../common";

interface Location{
    icon: string;
    country: string;
    province: string;
    city: string;
}

interface Payment{
    bank: string;
    account: string;
    type: string;
}

export enum Team {
    MANAGEMENT = 'Management',
    PRODUCT = 'Product',
    ART = 'Art',
    DISTRIBUTION = 'Distribution',
    GROWTH = 'Growth'
}

export interface Admin extends Base{
    name:string;
    middlename:string;
    lastname:string;
    middlelastname:string;
    username:string;
    identification:string;
    email:string;
    phone: string;
    password:string;
    photo:string;
    position:string;
    location:Location;
    team: Team;
    birthdate:string;
    payment: Payment;
    projects: string[];
    salary: number;
    age: number;
    code: number;
    login_attempts: number;
    two_factor_auth: boolean;
    locked: boolean;
    start_date: string;
    last_login: string;
    points: number;
}