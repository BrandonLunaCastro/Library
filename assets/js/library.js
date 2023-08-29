
const btnAddBook = document.getElementById("add__book"),
      modal = document.getElementById("main__modal"),
      form = document.querySelector(".form"),
      sectionCards = document.querySelector(".cards");
     
    
/* Funcion que abre elcuadro de dialogo */
const showDialog = () => {
    modal.showModal();
}
btnAddBook.addEventListener("click",showDialog);

/* Revisamos mediante filter si el libro que vamos a incluir se encuentra en la biblioteca */
const detectRepeatBooks = (arr,title,author) => {
    let response = arr.filter(el => el.title === title && el.author == author)
    return response.length === 0 ? true : false ; 

}

/* Tomamos los valores del formulario para instanciar el objeto */
form.addEventListener("submit", e => {  
    e.preventDefault(); 

    let title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          pages = document.getElementById("pages").value,
          read = document.getElementById("Read").checked;     
          read = read == true ? "read" : "not read";


           if(library.length == 0){
                addBookToLibrary(title,author,pages,read);
                modal.close();  
           }else{
             if(detectRepeatBooks(library,title,author)){
                addBookToLibrary(title,author,pages,read)
                document.getElementById("title").classList.remove("error")
                document.querySelector("span").classList.remove("warning")
                modal.close();  
             }else{
                document.getElementById("title").classList.add("error")
                document.querySelector("span").classList.add("warning")   
             }
            }
            e.target.reset();  
})


/* Creamos nuestra matriz vacia donde se ingresaran los libros */

let library = [];

//reemplazamos nuestra funcion constructora por la sintaxis de clases 
class Book{
    constructor(title,author,pages,read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages , is read : ${this.read}`;
    }

}


/* Creamos el objeto lo agregamos a la matriz  */
function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);
    
    library.push(newBook);

    let book = library.at(-1)
    showLibrary(book);
};


/* Se crea el elemento HTML y se inserta con la informacion*/
function showLibrary(book){    
        let index = library.indexOf(book);
       
        let figure = document.createElement("figure"),
        h3 = document.createElement("h3"),
        p1 = document.createElement("p"),
        p2 = document.createElement("p"),
        p3 = document.createElement("p"),
        button1 = document.createElement("button"),
        button2 = document.createElement("button"),
        fragment = document.createDocumentFragment();

        figure.classList.add("card");
 

        if(book.read === "read" ){
            button1.classList.add("read");
            button1.innerText = "Read";
        }else{
            button1.classList.add("notRead");
            button1.innerText = "Not read";
        } 
        
        
        button1.setAttribute("data-read","read?"); 
        button1.classList.add("btn__card");
       
        button2.setAttribute("id","delete");
        button2.classList.add("delete");
        button2.classList.add("btn__card");
        button2.setAttribute("data-index",index);
        button2.innerText = "Delete";

        h3.innerText = `Title : ${book.title}`;
        p1.innerText = `by : ${book.author}`;
        p2.innerText = `pages : ${book.pages}`;
        p3.innerText = `read? : ${book.read}`;

        figure.appendChild(h3);
        figure.appendChild(p1);
        figure.appendChild(p2);
        figure.appendChild(p3);
        figure.appendChild(button1);
        figure.appendChild(button2);

        fragment.appendChild(figure);

        sectionCards.appendChild(fragment); 
        detectBtns()    
};
    
    const changeStateBtn = (state,element) => {
        if(state === "read"){ 
            element.classList.remove("notRead");
            element.classList.add("read");
            element.innerText = "Read";
            element.previousSibling.innerText = "read? : read"
        } 

        if(state == 'not read'){
            element.classList.remove("read");
            element.classList.add("notRead");
            element.innerText = "Not read";
            element.previousSibling.innerText = "read? : not red"
        }
    }

    function getIndex(element){
        let index = element.dataset.index
        return index
    } 

    const addFunctionality = (e) => {
        let indice,
            state,
            book

        //funcionalidad para el boton de read o not read
        if(e.target.dataset.read){
            indice = getIndex(e.target.nextSibling);
            book = library[indice];
            
            //identifica el estado actual del libro 'read' o 'not read'
            let actualState = e.target.className.includes("notRead") ? "not read" : "read"
           
            // modifica en el prototype alternando segun el estado actual, es decir si esta en no leido lo
            //cambia a leido y viceversa
            book.read = actualState === "not read" ? "read" : "not read"
            state = library[indice].read;
            
            changeStateBtn(state,e.target);
        }

        //funcionalidad para el boton delete
        if(e.target.matches(".delete")){
           
            e.target.parentElement.remove();//borramos la targeta
            
            let index = getIndex(e.target);

            library.splice(index,1)//borramos el libro de la matriz 

        }
    }

    const detectBtns = () => {
        let btns = document.querySelectorAll(".btn__card")
        btns.forEach((btn)=>btn.addEventListener("click",addFunctionality))
    };

  
