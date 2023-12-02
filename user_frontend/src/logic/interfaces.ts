export interface Task {
    id: number,
    date: Date,
    name: string,
    urgency: number,
    longitude: number,
    latitude: number,
    isCompleted: boolean,
}