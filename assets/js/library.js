
const btnAddBook = document.getElementById("add__book"),
      modal = document.getElementById("main__modal"),
      form = document.querySelector(".form"),
      sectionCards = document.querySelector(".cards");
     
    
/* Funcion que abre elcuadro de dialogo */
const showDialog = () => {
    modal.showModal();
}

btnAddBook.addEventListener("click",showDialog);
/* Tomamos los valores del formulario para instanciar el objeto */
form.addEventListener("submit", e => {    
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          pages = document.getElementById("pages").value,
          read = document.getElementById("Read").value;     
          
          addBookToLibrary(title,author,pages,read);

          modal.close();
          
          e.preventDefault();
})

/* Creamos nuestra matriz vacia donde se ingresaran los libros y construimos la funcion constructora */

let library = [];

function Book(title,author,pages,read){
    this.title = title ? title : "Can't Hurt Me" ,
    this.author = author ? author : "David googins" ,
    this.pages = pages ?pages : 300 ,
    this.read = read ? read : "not read",
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages , is read : ${this.read}`;
    };
};

/* Creamos el objeto lo agregamos a la matriz  */
function addBookToLibrary(title,author,pages,read){
    const newBook = new Book(title,author,pages,read);

    library.push(newBook);
    let book = library.at(-1)
   
    showLibrary(book);

};

/* Se crea el elemento HTML y se inserta con la informacion*/
function showLibrary(book){
 
       
        console.log(book)
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
            button1.setAttribute("data-read","read") ;
            button1.setAttribute("id","read");
            button1.classList.add("read");
            button1.innerText = "Read";
        }else{
            button1.setAttribute("data-read","notread"); 
            button1.setAttribute("id","not-read");
            button1.classList.add("notRead");
            button1.innerText = "Not read";
        }
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
        let cardsNode = document.querySelectorAll('.card')
        detectCards(cardsNode,book)
};

    const changeStateBtn = (e,book) => {
     let card = e.target.parentElement
     let btn;
 
     if(e.target.matches("#delete")){
        let libraryIndex = e.target.dataset.index;
        library.splice(libraryIndex,1);
        card.remove()
       
     }

    if(e.target.matches("#read")){
        btn = e.target;
        console.log("read")
        console.log(btn)
        btn.setAttribute("id","not-read");
        btn.classList.remove("read");
        btn.classList.add("notRead");
        btn.innerText = "Not read"; 

        book.read = "not read";
    //    console.log(btn);

    } 
    if(e.target.matches("#not-read")){
        btn = e.target;
        console.log("not read")
        btn.setAttribute("id","read");
        btn.classList.remove("notRead");
        btn.classList.add("read");
        btn.innerText = "Read";

        book.read = "read";

      //  console.log(btn);

    } 

}

     function detectCards(cardsNode,book){
         
       cardsNode.forEach(card => {
          card.addEventListener("click",e => {
            console.log("se hace click")
            changeStateBtn(e,book);
          })
        });  
    }
 
 
   
    window.addEventListener("DOMContentLoaded",e => {
        addBookToLibrary()
    })


/*     const changeStateBtn = (e) => {
        let card = e.currentTarget
        
         if(e.target.matches("#delete")){
            let libraryIndex = e.target.dataset.index;
            console.log(card)
            console.log(libraryIndex)
            sectionCards.removeChild(card)
           
        }

        if(e.target.matches("#read")){
            console.log('presionaste el btn read')
        } 

    }

    function detectCards(cardsNode){
        console.log(cardsNode)
        cardsNode.forEach(card => {
          card.addEventListener("click",changeStateBtn)
        
        });
    }
      */