export class ToDoList{
    constructor(){
        this.tdList = [];
    }
    addToDo(todo){
        this.tdList.push(todo);
    }
    renderToDo(){
        let content = '';
        // Duyet mang tu phai qua trai (bat dau tu phan tu cuoi cung cua mang)
        content = this.tdList.reduceRight((tdContent,item,index)=>{
            tdContent += `
            <li>
                <span>${item.textTodo}</span>
                <div class="buttons">
                    <button class="remove" data-index="${index}" onclick="deleteToDo(event)" data-status="${item.status}">
                    <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" data-index="${index}" data-status="${item.status}" onclick="completeToDo(event)">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `;
            return tdContent;
        },'');

        return content;
    }
    removeToDo(index){
        this.tdList.splice(index,1);
    }
    sortToDoList(isDES){
        this.tdList.sort((todo,nextToDo)=>{
            const textA = todo.textTodo.toLowerCase();
            const textB = nextToDo.textTodo.toLowerCase();

            // ASC, ham localCompare so sanh ca chu co dau
            return textB.localeCompare(textA);
        });
        if(isDES){
            this.tdList.reverse();
        }
    }
}