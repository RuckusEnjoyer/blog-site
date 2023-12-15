const submitForm = document.querySelector('#submit');


const loginHandler = async (event) => {
    event.preventDefault()
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    console.log(title, content);
    if (title && content) {
        const upload = await fetch('/api/post/create', {
            method: 'POST',
            body: JSON.stringify({ title, content}), 
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
        console.log('You must fill out the post!')
    }

}


submitForm.addEventListener('submit', loginHandler)