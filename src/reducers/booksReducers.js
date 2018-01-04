"use strict"

//STEP 3
export function booksReducers(state = {
    books: [] }, action) {
    switch (action.type) {
        case 'GET_BOOKS':
         
            return { books: [...state.books, ...action.payload] }
            break;

        case 'POST_BOOK':
    
            return { ...state, books: [...state.books, ...action.payload], msg:'Saved! Click to continue', style:'success', validation:'success' }
            break;
        case 'POST_BOOK_REJECTED':
    
            return { ...state, msg: 'Please, try again', style: 'danger', validation: 'error'}
            break;

        case 'RESET_BUTTON':
     
            return { ...state, msg: null, style: 'primary', validation: null }
            break;
        case 'UPDATE_BOOK':
            const currentBooksToUpdate = [...state.books];
          
            const indexToUpdate = currentBooksToUpdate.findIndex(book => book._id == action.payload._id)
            console.log(indexToUpdate);
            let newBook = {
                ...currentBooksToUpdate[indexToUpdate],
                title: action.payload.title
            }
            console.log(newBook);

            return { books: [...currentBooksToUpdate.slice(0, indexToUpdate), newBook, ...currentBooksToUpdate.slice(indexToUpdate + 1)] }
            break;

        case 'DELETE_BOOK':
            const currentBooksToDelete = [...state.books];
            const indexToDelete = currentBooksToDelete.findIndex(book => book._id == action.payload)
            console.log(indexToDelete);

            return { books: [...currentBooksToDelete.slice(0, indexToDelete), ...currentBooksToDelete.slice(indexToDelete + 1)] }
            break;

    }
    return state
}

