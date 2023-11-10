use recipeAppUsers;

db.dropDatabase();

db.users.insertMany([
    {
        name: "Lennie Harman",
        dietary_preference: ['vegan', 'gluten%20free'],
        favourites: [],
        intolerances: ['gluten']
    },

    {
        name: "Gina Brand",
        dietary_preference: ['vegetarian', 'ketogenic'],
        favourites: [],
        intolerances: ['gluten']
    },

    {
        name: "Ruairidh Dunn",
        dietary_preference: [],
        favourites: [],
        intolerances: []
    },

    {
        name: "Elspeth MacIver",
        dietary_preference: [],
        favourites: [],
        intolerances: []
    },

    {
        name: "Evan Parry",
        dietary_preference: [],
        favourites: [],
        intolerances: []
    },

    {
        name: "Eleri Owens", 
        dietary_preference: [],
        favourites: [],
        intolerances: []
    },

    {
        name: "Connor O'Hannigan",
        dietary_preference: [],
        favourites: [],
        intolerances: []
    },

    {
        name: "Bridie O'Donnell",
        dietary_preference: [],
        favourites: [],
        intolerances: []
    },
])
