export default async ({ route, $axios, redirect, }) => {
    const loginCheckList = ['contract','openDeathNote', 'passwordReset', 'complete-delete', 'complete'];

    if(!loginCheckList.includes(route.name)) {
        const loginCheck = await $axios.get('/api/checkLogin');
        const { isLogin } = loginCheck.data;

        if(!isLogin) await $axios.post('/api/logout').then((response) => {
            if(response.data.logout) redirect('/openDeathNote');
        });
    }
}