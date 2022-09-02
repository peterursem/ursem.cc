import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://ursemca.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

onValue(ref(db, "notes/", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
}));

class Note {
    position;
    content;
    colour;

    constructor(position, content) {
        this.position = position;
        this.content = content;
        this.colour = this.colour;
    }

    upload() {
        set(ref(db, "notes/" + this.id), {
            "position" : this.position,
            "content" : this.content,
            "colour" : this.colour
        });
    }
}