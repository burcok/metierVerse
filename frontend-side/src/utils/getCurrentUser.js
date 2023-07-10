export async function getCurrentUser(){
    try {
        let getCurrentUserData = localStorage.getItem('sessionData')
        getCurrentUserData = JSON.parse(getCurrentUserData)
    
        const response = await fetch("http://localhost:8080/api/user/" + getCurrentUserData.username);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          return false;
        }
    } catch (error) {
        console.error(error);
    }
}