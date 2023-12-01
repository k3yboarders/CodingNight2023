import Task from "./Task";

export default interface Volunteer {
id: number,
name: string,
lastName: string,
profession: string,
tasks: Array<Task>,

}