
const API = "http://localhost:3000";

/* LOAD ROOMS ON PAGE LOAD */
window.onload = loadRooms;

/* ADD ROOM */
function createRoom() {
    fetch(API + "/addRoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            roomNo: rNo.value,
            capacity: Number(rCap.value),
            ac: rAC.checked,
            washroom: rWash.checked
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert(data.message);
            return;
        }
        loadRooms();
        rNo.value = "";
        rCap.value = "";
        rAC.checked = false;
        rWash.checked = false;
    });
}

/* GET ALL ROOMS */
function loadRooms() {
    fetch(API + "/rooms")
        .then(res => res.json())
        .then(data => {
            roomList.innerHTML = "";
            data.forEach(room => {
                roomList.innerHTML += `
                <tr>
                    <td>${room.roomNo}</td>
                    <td>${room.capacity}</td>
                    <td>${room.ac ? "Yes" : "No"}</td>
                    <td>${room.washroom ? "Yes" : "No"}</td>
                </tr>`;
            });
        });
}

/* ALLOCATE ROOM */
function findRoom() {
    fetch(API + "/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            students: Number(stuCount.value),
            ac: reqAC.checked,
            washroom: reqWash.checked
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            result.innerHTML = "❌ No room available";
        } else {
            let r = data.room;
            result.innerHTML = `
            ✅ Room Allocated <br>
            Room No: ${r.roomNo} <br>
            Capacity: ${r.capacity} <br>
            AC: ${r.ac ? "Yes" : "No"} <br>
            Washroom: ${r.washroom ? "Yes" : "No"}
            `;
        }
    });

    stuCount.value = "";
    reqAC.checked = false;
    reqWash.checked = false;
}
