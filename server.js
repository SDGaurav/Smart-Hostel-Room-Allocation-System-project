const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let hostelRooms = [];

// ADD ROOM API
app.post("/addRoom", (req, res) => {
    const room = req.body;

    if (!room.roomNo || room.capacity <= 0) {
        return res.json({ success: false, message: "Invalid room" });
    }

    hostelRooms.push(room);
    res.json({ success: true, rooms: hostelRooms });
});

// GET ROOMS API
app.get("/rooms", (req, res) => {
    res.json(hostelRooms);
});

// ALLOCATE ROOM API
app.post("/allocate", (req, res) => {
    const { students, ac, washroom } = req.body;

    let available = hostelRooms.filter(r =>
        r.capacity >= students &&
        (!ac || r.ac) &&
        (!washroom || r.washroom)
    );

    available.sort((a, b) => a.capacity - b.capacity);

    if (available.length === 0) {
        res.json({ success: false });
    } else {
        res.json({ success: true, room: available[0] });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
