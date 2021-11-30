export default function(getState) {
    const headers = {
        "Content-Type": "application/json"
    };
    
    const token = getState().auth.token;
    if(token) headers['Authorization'] = `Bearer ${token}`;

    return headers;
};