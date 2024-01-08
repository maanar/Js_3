


var bookNameInput = document.getElementById("bookNameInput");
var urlNameInput = document.getElementById("urlNameInput");
var urlRegex = /^(https):\/\/[a-zA-Z0-9]{3,}\.com$/
var nameRegex = /^\w{3,}$/i
var bookList = [];


if (localStorage.getItem("books") != null) {
    bookList = JSON.parse(localStorage.getItem("books"))

    displayData();  
}


function addBook(){
   
    if (
        bookNameInput.classList.contains("is-valid") &&
       urlNameInput.classList.contains("is-valid")
    ) {
        var book ={
            name: bookNameInput.value,
            url:  urlNameInput.value
        }
        
        bookList.push(book);
    
        localStorage.setItem("books" , JSON.stringify(bookList))
         clearBook();  
         displayData();
        console.log(bookList);
        bookNameInput.classList.remove("is-valid")
        urlNameInput.classList.remove("is-valid")
    }

   

}

function clearBook(){
    bookNameInput.value ="";
    urlNameInput.value ="";
}

function displayData(){
  
    var list = "";

    for( var i= 0 ; i<bookList.length ; i++){
         list += `<tr>
         <td>${i}</td>
         <td>${bookList[i].name}</td>
         <td> 
         <a href="${bookList[i].url}" class="btn btn-sm btn-warning"> <i class="fa-solid fa-eye pe-2"></i>visit</a>
         </td>
         <td>
              <button onclick="deleteBook(${i})" class="btn btn-sm btn-danger"> <i class="fa-solid fa-trash-can"></i> delete</button>
              </td>
       </tr>`
    }

   document.getElementById("tableBody").innerHTML = list ;

}

function deleteBook(index){
   bookList.splice(index ,1)
   localStorage.setItem("books" , JSON.stringify(bookList))
   console.log(bookList)
   displayData()
}


bookNameInput.addEventListener("input" ,function(){
      validate(bookNameInput , nameRegex)
});
urlNameInput.addEventListener("input" ,function(){
    validate(urlNameInput, urlRegex)
});


function validate(element , regex){
 var testRegex = regex;
 if (testRegex.test(element.value)) {
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
 }else{
    element.classList.remove("is-valid")
    element.classList.add("is-invalid")
 }
}