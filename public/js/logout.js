const logoutId = document.querySelector("#logout-id");

const logoutHandler = async () => {
    const logout = await fetch('/api/user/logout');
    if(logout.ok) {
        document.location.replace('/')
    } else {
        console.log('failed to logout :(')
        return;
    }
}

logoutId.addEventListener('click', logoutHandler)