

export const initialState = {

     status: 'checking',//'checking', // , y authenticated
     uid: null,
     email: null,
     displayName: null,
     photoURL: null,
     errorMessage: null,
}
export const authenticatedState = {

     status: 'authenticated',//'checking', // , y authenticated
     uid: '123ABC',
     email: 'damian@gmail.com',
     displayName: 'Memo User',
     photoURL: 'https://photo.jpg',
     errorMessage: null,
}
export const notAuthenticatedState = {

     status: 'not-authenticated',//'checking', // , y authenticated
     uid: null,
     email: null,
     displayName: null,
     photoURL: null,
     errorMessage: null,
}


export const demoUser = {
    uid: '123ABC',
    email: 'demo@gmail.com',
    displayName: 'Demo User',
    photoURL: 'https://photo.jpg',
    
}