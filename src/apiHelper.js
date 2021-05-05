class ApiHelper {

    static async get(url) {
        let result = await fetch(url, {
            method: "GET",
            headers: {
                'x-api-key': 'ff99bb28-97c1-4dc7-94e0-6eceba4ec026',
            },
        });
        if (result.ok) {
            return result.json();
        }
        else { console.log(result.status) }
    }

    static async getAllBreeds() {
        let result = await this.get("https://api.thedogapi.com/v1/breeds");
        return result;
    }

    static async getBreed(breed) {
        let dogs = await this.get(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
        console.log(dogs.length)
        var result = [];
        for (let idx = 0; idx < dogs.length; idx++) {
            const element = dogs[idx];
            let temp = await this.get(`https://api.thedogapi.com/v1/images/${element.reference_image_id}`)
            result.push(temp)
        }
        return result;
    }

    static async getPage(page, order, type) {
        let result = await this.get(`https://api.thedogapi.com/v1/images/search?limit=15&page=${page}&order=${order}&mime_types=${type}`);
        return result;
    }
}

export default ApiHelper;



// https://docs.thedogapi.com/pagination


