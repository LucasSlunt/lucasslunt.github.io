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
        // But for now, we might handle this in the manager to keep the view logic separate
        // Or we can return the data array format expected by the current logic if we want to reuse it
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
