const addinputButton = document.getElementById('add_input');
const btnText = addinputButton.innerText;
const inputFeild = document.getElementById('inputfeild');
const recordsDisplay = document.getElementById('records');
let todos = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
  todos = JSON.parse(objStr);
}

DisplayInfo();
addinputButton.onclick = () => {
   //get user's name from text field
   const name = inputFeild.value;
   if (edit_id != null) {
      //edit action
      todos.splice(edit_id, 1, {
         'name': name
      });
      edit_id = null;
   } else {
      //insert action
      todos.push({
         'name': name
      });
   }

   SaveInfo(todos);
   inputFeild.value = '';
   addinputButton.innerText = btnText;
}

// store user's name in local storage
function SaveInfo(todos) {
   let str = JSON.stringify(todos);
   localStorage.setItem('users', str);
   DisplayInfo();
}

// display user's name
function DisplayInfo() {
   let todoItem = '';
   todos.forEach((user, i) => {
    todoItem += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
         </tr>`;
   });
   recordsDisplay.innerHTML = todoItem;
}

// edit user's name
function EditInfo(id) {
   edit_id = id;
   inputFeild.value = todos[id].name;
   addinputButton.innerText = 'Save Changes';
}

//delete user's name
function DeleteInfo(id) {
  alert('I am gonna detele this');
  todos.splice(id, 1);

   SaveInfo(todos);

}