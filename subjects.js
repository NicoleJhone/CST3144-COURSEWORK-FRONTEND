let subjects = [
    {
        "id": 1001,
        "title": "Coding",
        "description": "Includes HTML, JavaScript, Python, and Ruby on Rails.",
        "location": "Burj Khalifa, Dubai",
        "timings": '8:30 am- 10:00 pm',
        "price": 120.00,
        "image": "images/coding.png",
        "availableSpace": 11,
        "rating": 5 
    },
    {
        "id": 1002,
        "title": "Music",
        "description": "Provides individual and small group instrumental lessons for children ages 7-15.",
        "location": "The Museum of The Future, Dubai",
        "timings": '8:00 am- 10:00 pm',
        "price": 200.00,
        "image": "images/music.png",
        "availableSpace": 20,
        "rating": 4
    },
    {
        "id": 1003,
        "title": "Robotics",
        "description": "Engaging the students with real-world robotics and programming education.",
        "location": "Dubai Mall, Dubai",
        "timings": '8:00 am- 11:00 pm',
        "price": 90.00,
        "image": "images/robotics.png",
        "availableSpace": 20,
        "rating": 4
    },
    {
        "id": 1004,
        "title": "Creative Writing",
        "description": "At our venues, children aged 6 to 18 can write and convey their tales both in person and virtually. Students can also collaborate in writing and storytelling clubs, engage on individual projects, and learn from guest writers, artists, and specialists.",
        "location": "Louvre, Abu Dhabi",
        "timings": '8:00 am- 8:00 pm',
        "price": 110.00,
        "image": "images/writing.png",
        "availableSpace": 10,
        "rating": 3
    },
    {
        "id": 1005,
        "title": "Cooking",
        "description": "Our program places a strong emphasis on culinary skills. We show them how to chop, dice, peel, slice, wash, squeeze, core, bake, toast, whisk, fold, and mix. We also show kids how to interpret recipes and measure ingredients.",
        "location": "Etihad Towers Observation Deck, Abu Dhabi",
        "timings": '9:00 am- 10:00 pm',
        "price": 250.00,
        "image": "images/cooking.png",
        "availableSpace":9,
        "rating": 5
    },
    {
        "id": 1006,
        "title": "Social Skills",
        "description": "Having excellent communication and interaction skills is like a blessing.",
        "location": "Sharjah Art Museum, Sharjah",
        "timings": '8:00 am- 11:00 pm',
        "price": 239.00,
        "image": "images/social.png",
        "availableSpace":10,
        "rating": 5
    },
    {
        "id": 1007,
        "title": "Python for AI",
        "description": "Python is one of the most powerful programming languages worldwide, used in many projects.",
        "location": "Souk Madinat, Jumeirah",
        "timings": '8:00 am- 10:00 pm',
        "price": 250.00,
        "image": "images/python.png",
        "availableSpace":10,
        "rating": 5
    },
    {
        "id": 1008,
        "title": "Movie/Video Making",
        "description": "Weekly workshop sessions led by an experienced filmmaker. Looking at the fundamentals of filmmaking, including video editing. ",
        "location": "Ferrari World, Abu Dhabi",
        "timings": '8:00 am- 8:00 pm',
        "price": 240.00,
        "image": "images/video.png",
        "availableSpace":10,
        "rating": 5
    },
    {
        "id": 1009,
        "title": "Photography",
        "description": "It focuses on the principles of photography and helps aspiring photographers begin their adventure in the photographic field.",
        "location": "Yas Waterworld, Abu Dhabi",
        "timings": '10:00 am- 8:00 pm',
        "price": 240.00,
        "image": "images/photography.png",
        "availableSpace":13,
        "rating": 5
    },
    {
        "id": 1010,
        "title": "Dance",
        "description": "Our after-school program aims to introduce youngsters to the world of dance through a range of classes.",
        "location": "Warner Bros. World, Abu Dhabi",
        "timings": '8:00 am- 11:00 pm',
        "price": 240.00,
        "image": "images/dance.png",
        "availableSpace":12,
        "rating": 5
    },
    {
        "id": 1011,
        "title": "Gymnastics",
        "description": "Learn basic skills and help them develop their social and mental abilities. Supporting the journey from beginner to advanced.",
        "location": "Jumeirah Public Beach, Dubai",
        "timings": '8:00 am- 11:00 pm',
        "price": 240.00,
        "image": "images/gymnastics.png",
        "availableSpace":14,
        "rating": 5
    },
    {
        "id": 1012,
        "title": "Basketball",
        "description": "Fulfill the demands of all aspiring young basketball players. Our basketball programs are year-round and designed to flow with age, talent, and commitment level.",
        "location": "Rendevous, Dubai",
        "timings": '8:00 am- 11:00 pm',
        "price": 250.00,
        "image": "images/basketball.png",
        "availableSpace":13,
        "rating": 5
    },
    {
        "id": 1013,
        "title": "Basketball",
        "description": "Fulfill the demands of all aspiring young basketball players. Our basketball programs are year-round and designed to flow with age, talent, and commitment level.",
        "location": "Al Mamzar Beach Park, Dubai",
        "timings": '8:00 am- 11:00 pm',
        "price": 250.00,
        "image": "images/basketball.png",
        "availableSpace":13,
        "rating": 5
    },
    {
        "id": 1014,
        "title": "Basketball",
        "description": "Fulfill the demands of all aspiring young basketball players. Our basketball programs are year-round and designed to flow with age, talent, and commitment level.",
        "location": "Louvre, Abu Dhabi",
        "timings": '8:00 am- 11:00 pm',
        "price": 250.00,
        "image": "images/basketball.png",
        "availableSpace":13,
        "rating": 5
    },
    {
        "id": 1015,
        "title": "Dance",
        "description": "Our after-school program aims to introduce youngsters to the world of dance through a range of classes.",
        "location": "Warner Bros. World, Abu Dhabi",
        "timings": '8:00 am- 11:00 pm',
        "price": 250.00,
        "image": "images/dance.png",
        "availableSpace":13,
        "rating": 5
    },
    {
        "id": 1016,
        "title": "Dance",
        "description": "Our after-school program aims to introduce youngsters to the world of dance through a range of classes.",
        "location": "Jumeirah Public Beach, Dubai",
        "timings": '8:00 am- 11:00 pm',
        "price": 250.00,
        "image": "images/dance.png",
        "availableSpace":13,
        "rating": 5
    }
]