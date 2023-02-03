const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    //Contingency for logout failure
    if (response.ok) {
        document.location/replace('/');
    } else {
        alert('Failed to Log Out')
    }
}
//addEventListener for logout button/function
document.querySelector().addEventListener('click', logout);