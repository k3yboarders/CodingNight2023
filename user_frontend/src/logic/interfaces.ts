export interface Task {
    id: number,
    date: Date,
    name: string,
    urgency: number,
    longitude: number,
    latitude: number,
    isCompleted: boolean,
}

export enum UserType {
    ADMIN = "ADMIN",
    DRIVER = "DRIVER",
    VOLUNTEER = "VOLUNTEER",
}

export enum DangerType {
    BOMBING = "BOMBING",
    TERRORIST_ATTACK = "TERRORIST_ATTACK",
    EARTHQUAKE = "EARTHQUAKE",
    TSUNAMI = "TSUNAMI",
    TORNADO = "TORNADO",
    FAMINE = "FAMINE",
    ROAD_ACCIDENT = "ROAD_ACCIDENT",
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    type: UserType;
}

export interface Ambulance {
    id: number;
    longitude: number;
    latitude: number;
    driver?: User;
}

export interface Report {
    id: number;
    text: string;
    description: string;
    longitude: number;
    latitude: number;
    type: DangerType;
    ambulance?: Ambulance;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}