import VueCookies from 'vue-cookies';
import { getCurrentUser } from './getCurrentUser.js';

export async function isUserLoggedIn() {
    const sessionData = JSON.parse(localStorage.getItem('sessionData'));
    const jwtToken = VueCookies.get('jwtToken');

    if (sessionData && jwtToken === sessionData?.token) {
        try {
            return await getCurrentUser();
        } catch (error) {
            console.error(error);
            // Handle error fetching current user
        }
    } else {
        try {
            localStorage.removeItem('sessionData');
            VueCookies.remove('jwtToken');
        } catch (error) {
            console.error(error);
            // Handle error removing session data
        }
    }
}