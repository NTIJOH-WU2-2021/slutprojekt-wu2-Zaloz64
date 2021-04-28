class ApiHelper {

    static async get(url) {
        let result = await fetch(url, {
            method: "GET",
            headers: {
                'x-api-key': 'ff99bb28-97c1-4dc7-94e0-6eceba4ec026',
                //  'Accept': 'application/json',
            },
        });

        if (result.ok) {
            return result.json();
        }
        else { console.log(result.status) }
    }

    // Page & order, amount?
    // breed
    // type all or nothing
    // static mime_types=jpg,png
    // animated mime_types=gif

    // static async getBreed(breed_id) {

    // }

    static async getAllBreeds() {
        let result = await this.get("https://api.thedogapi.com/v1/breeds");
        return result;
    }

    static async getPage(page, order, type) {
        let result = await this.get(`https://api.thedogapi.com/v1/images/search?limit=15&page=${page}&order=${order}&mime_types=${type}`);
        return result;
    }
}

export default ApiHelper;



// https://docs.thedogapi.com/pagination


