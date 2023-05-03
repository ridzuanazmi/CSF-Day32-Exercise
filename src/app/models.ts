export interface Task {
    description: string
    priority: number
}

export interface ToDo {
    name: string
    dueDate: Date
    tasks: Task[]
}