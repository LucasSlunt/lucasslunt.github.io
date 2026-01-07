class Apple {
    constructor(id, name, taste, texture, rating, notableTraits, parents, dateDocumented) {
        this.id = id;
        this.name = name;
        this.taste = taste;
        this.texture = texture;
        this.rating = rating;
        this.notableTraits = notableTraits;
        this.parents = parents;
        this.dateDocumented = dateDocumented;
        this.imagePath = `./ApplePictures/AllApples/${id}.jpg`;
    }

    getHTMLRow() {
        // This method will be used to generate the table row HTML
        return [
            `<img src="${this.imagePath}" width="80" height="80" id="apple-id-${this.id}" alt="${this.name}">`,
            this.name,
            this.taste,
            this.texture,
            this.rating,
            this.notableTraits,
            this.parents,
            this.dateDocumented
        ];
    }
}
