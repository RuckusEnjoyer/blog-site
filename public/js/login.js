const submitForm = document.querySelector('#submit');


const loginHandler = async (event) => {
    event.preventDefault()
    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(userName, password);
    if (userName && password) {
        const upload = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password}), 
            headers: { 'Content-type': 'application/json'},
        })
        console.log(upload);
        if(upload.ok) {
            document.location.replace('/')
        } else {
            console.log('this is not reaching the server!')
            return;
        }
    } else {
        console.log('you must have a username or password!')
    }

}

if (submitForm) {
    
}
submitForm.addEventListener('submit', loginHandler)