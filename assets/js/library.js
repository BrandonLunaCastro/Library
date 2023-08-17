
const btnAddBook = document.getElementById("add__book"),
      modal = document.getElementById("main__modal"),
      form = document.querySelector(".form"),
      main = document.querySelector("main")

const showDialog = () => {
    modal.showModal();
}

btnAddBook.addEventListener("click",showDialog)
form.addEventListener("submit", e => {
    console.log("se ejecuta")
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          pages = document.getElementById("pages").value,
          read = document.getElementById("Read").value     
          
          addBookToLibrary(title,author,pages,read)
          modal.close();
          
          e.preventDefault();
})

let library = [];

function Book(title,author,pages,read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages , is read : ${this.read}`;
    };
};

function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read)
    console.log(newBook.info())
    library.push(newBook)
};

function showLibrary(){
    library.forEach((book) => {
        addTarget(book)
        
    })
};

const addTarget = (book) => {
    console.log(book.bind(book))
   // console.log(book.title,book.author,book.pages,book.read)
    /* 
    main.appendChild = `
    <figure class="card">
      <h3>Title : Cant hurt me</h3>
      <p>by : David googins</p>
      <p>pages : 300 </p>
      <p>read? : Not read</p>
      <button type="button" data-read="read" id="read">Read</button>
      <button type="button" id="delete" >Delete</button>
    </figure>` */
}

/*
            <figure class="card">
                <h3>Title : Cant hurt me</h3>
                <p>by : David googins</p>
                <p>pages : 300 </p>
                <p>read? : Not read</p>
                <button type="button" data-read="read" id="read">Read</button>
                <button type="button" id="delete" >Delete</button>
            </figure>
*/

window.addEventListener('DOMContentLoaded',showLibrary) 