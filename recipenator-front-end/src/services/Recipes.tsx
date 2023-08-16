



export async function getRecipes(data: string) : Promise<JSON> {
    try {
        console.log(data);
        const queryParams = new URLSearchParams();
        queryParams.set('app_id', import.meta.env.VITE_APP_ID || '');
        queryParams.set('app_key', import.meta.env.VITE_APP_KEY || '');
        queryParams.set('q', data);
        const url = `https://api.edamam.com/search?${queryParams.toString()}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching recipes');
        }
        const responseData = await response.json();
        return responseData;
    }
    catch(error){
        throw error;
    }
}