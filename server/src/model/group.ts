import { Task } from "./task";

export interface Group {
    _id: string
    name: string
    companyId: string
    tasks: Task[]
}
