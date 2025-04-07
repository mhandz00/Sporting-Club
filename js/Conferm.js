// function confirmReservation() {
//     const reservationId = document.getElementById('reservationId').value;
//     if (reservationId) {
//         alert(`Reservation ${reservationId} has been confirmed.`);
//         // Additional logic to handle confirmation can be added here
//     } else {
//         alert('Please enter a reservation ID to confirm.');
//     }
// }

// function postponeReservation() {
//     const reservationId = document.getElementById('reservationId').value;
//     const newDate = document.getElementById('newDate').value;
//     if (reservationId && newDate) {
//         alert(`Reservation ${reservationId} has been postponed to ${newDate}.`);
//         // Additional logic to handle postponement can be added here
//     } else {
//         alert('Please enter a reservation ID and a new date to postpone.');
//     }
// }

// document.getElementById('confirmButton').addEventListener('click', confirmReservation);
// document.getElementById('postponeButton').addEventListener('click', postponeReservation);






document.getElementById("confirmButton").addEventListener("click", function () {
    const reservationId = document.getElementById("reservationId").value;
    const stadiumName = document.getElementById("stadiumName").value;
    const reservationDay = document.getElementById("reservationDay").value;
    const reservationDate = document.getElementById("reservationDate").value;
    const reservationTime = document.getElementById("reservationTime").value;
    const mobileNumber = document.getElementById("mobileNumber").value;

    fetch("http://127.0.0.1:5000/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reservationId, stadiumName, reservationDay, 
            reservationDate, reservationTime, mobileNumber
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
    })
    .catch(error => console.error("Error:", error));
});
