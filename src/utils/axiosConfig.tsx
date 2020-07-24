export let axiosConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}