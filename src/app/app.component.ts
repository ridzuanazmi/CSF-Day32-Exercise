import { Component } from '@angular/core';
import { ToDo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day-32Exercise';

  todo: ToDo[] = []
  
  ngOnInit(): void {
      const d = localStorage.getItem('todo')
      if (!d)
        return
      // @ts-ignore
      const t: any = JSON.parse(d)
      t['dueDate'] = new Date(t['dueDate'])
      this.todo = {...t}
      console.info('>>> t: ', this.todo)
  }

  processTodo(todo: ToDo) {
    console.info('>>>> todo: ', todo)
    localStorage.setItem('todo', JSON.stringify(todo))
    this.todo.unshift(todo)
  }

  deleteItem(idx: number) {
    this.todo.splice(idx, 1)
  }
}
