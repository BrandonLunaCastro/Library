let arrBooks = [];

function Book(title,author,pages,read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages , is read : ${this.read}`;
    };
}

    const cantHurtMe = new Book('Can`t hurt me','David googins',300,false);

    //console.log(cantHurtMe.info())
    
    addBookToLibrary(cantHurtMe)

function addBookToLibrary(objBook){
    arrBooks.push(objBook.info())

}

function showLibrary(){
    const board = document.querySelector(".board");
    board.innerText =`${arrBooks}`;
}



window.addEventListener('DOMContentLoaded',showLibrary)