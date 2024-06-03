function display(){
    var btn = document.querySelector('.btn');
    var table = document.querySelector('#table');

    btn.addEventListener("click", function(){
        var content = document.querySelector('.content').value;
   
        // GET DATA(CONTENT,DATE AND TIME)
        var existingData = localStorage.getItem('content');
        var arr = existingData ?  JSON.parse(existingData) : [];
        var currentDate = new Date().toLocaleString();

        // ADD NEW CONTENT TO THE ARR            
        arr.push({ content: content, date: currentDate });

        // STORE DATA
        localStorage.setItem('content', JSON.stringify(arr));

        // DISPLAY DATA
        console.log(arr);

        // Clear the table before adding new rows
        table.innerHTML = '';

        // Add rows to the table
        arr.forEach((element,index) => {
            var tr = document.createElement('tr');

            // TASK
            var tdTask = document.createElement('td');
            var html ='';
            html += `
                <td>
                    <input class='inputTask' data-index="${index}" type="text" style='display:none;' value="${element.content}">                    <span class='spanTask'>${element.content}</span>
                </td>
            `;
            tdTask.innerHTML = html;
            tr.appendChild(tdTask);

            // DATE
            var tdDate = document.createElement('td');
            tdDate.textContent = element.date;
            tr.appendChild(tdDate);

            // BUTTONS
            var tdButtons = document.createElement('td');
            var buttons = `
                <div class='buttons'>
                    <button data-index="${index}" class='update'>update</button><br>
                    <button data-index="${index}" class='delete'>delete</button>
                </div>
            `;
            tdButtons.innerHTML = buttons;
            tr.appendChild(tdButtons);

            // ADD THE TR TO THE TABLE 
            table.appendChild(tr);
        });

        change();
    });
}
display();

function change() {
    // update
    var updateBtns = document.querySelectorAll('.update');
    updateBtns.forEach(button => {
        button.addEventListener('click', function() {
            var tr = this.closest('tr');
            var inputTask = tr.querySelector('.inputTask');
            var spanTask = tr.querySelector('.spanTask');
            inputTask.style.display = 'block';
            spanTask.style.display = 'none';
        });
    });

    // input field keypress event
    var inputTasks = document.querySelectorAll('.inputTask');
    inputTasks.forEach(inputTask => {
        inputTask.addEventListener('keypress', function(event){
            if(event.key === 'Enter'){
                var modifiedInput = inputTask.value;
                var spanTask = inputTask.parentElement.querySelector('.spanTask');
                spanTask.textContent = modifiedInput;
                inputTask.style.display = 'none';
                spanTask.style.display = 'block';

                var index = inputTask.getAttribute('data-index');
                var arr = JSON.parse(localStorage.getItem('content'));
                arr[index].content = modifiedInput;
                localStorage.setItem('content', JSON.stringify(arr));

                // Update the corresponding row in the table
                var tr = inputTask.parentElement.parentElement;
                tr.querySelector('.update').setAttribute('data-index', index); // Update data-index attribute
                tr.querySelector('.delete').setAttribute('data-index', index); // Update data-index attribute
            }
        });
    });

    // delete
    var deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            var arr = JSON.parse(localStorage.getItem('content'));
            arr.splice(index, 1);
            localStorage.setItem('content', JSON.stringify(arr));
            var tr = this.closest('tr');
            tr.remove(); 
        });
    });

}

// function clearAll() {
//     localStorage.clear();
// }
// clearAll()
       
      