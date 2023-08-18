
const btnAddBook = document.getElementById("add__book"),
      modal = document.getElementById("main__modal"),
      form = document.querySelector(".form"),
      sectionCards = document.querySelector(".cards"),
      btnDelete = document.querySelector(".delete"),
      btnRead = document.querySelector(".read")

/* Funcion que abre elcuadro de dialogo */
const showDialog = () => {
    modal.showModal();
}

btnAddBook.addEventListener("click",showDialog)
/* Tomamos los valores del formulario para instanciar el objeto */
form.addEventListener("submit", e => {    
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          pages = document.getElementById("pages").value,
          read = document.getElementById("Read").value     
          
          addBookToLibrary(title,author,pages,read)
          modal.close();
          
          e.preventDefault();
})

/* Creamos nuestra matriz vacia donde se ingresaran los libros y construimos la funcion constructora */

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

/* Creamos el objeto lo agregamos a la matriz  */
function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read)

    library.push(newBook)

    let index = library.indexOf(newBook)

    showLibrary(newBook,index)
};

/* Se crea el elemento HTML y se inserta con la informacion*/
function showLibrary(book,index){
    console.log(book)
        let figure = document.createElement("figure"),
            h3 = document.createElement("h3"),
            p1 = document.createElement("p"),
            p2 = document.createElement("p"),
            p3 = document.createElement("p"),
            button1 = document.createElement("button"),
            button2 = document.createElement("button"),
            fragment = document.createDocumentFragment()

            figure.classList.add("card")
            figure.setAttribute("data-index",index)

            button1.setAttribute("data-read","read")
            button1.setAttribute("id","read")
            button1.classList.add("read")
            button1.innerText = "Read"

            button2.setAttribute("id","delete")
            button2.classList.add("delete")
            button2.innerText = "Delete"

            h3.innerText = `Title : ${book.title}`
            p1.innerText = `by : ${book.author}`
            p2.innerText = `pages : ${book.pages}`
            p3.innerText = `read? : ${book.read}`

            figure.appendChild(h3)
            figure.appendChild(p1)
            figure.appendChild(p2)
            figure.appendChild(p3)
            figure.appendChild(button1)
            figure.appendChild(button2)

            fragment.appendChild(figure)
            sectionCards.appendChild(fragment)
};


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

//window.addEventListener('DOMContentLoaded',showLibrary) 