// Your Firebase configuration object
const firebaseConfig = {

    apiKey: "AIzaSyDuNNDduNS3DgdkhwGivRvcTgnYEduN08Q",

  authDomain: "hostel-3559f.firebaseapp.com",

  projectId: "hostel-3559f",

  storageBucket: "hostel-3559f.appspot.com",

  messagingSenderId: "337807658068",

  appId: "1:337807658068:web:37bf5b3d434b243910b1c1",

  measurementId: "G-LXVR868CJ2"

  
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

window.addEventListener('DOMContentLoaded', (event) => {
    const complaintsBody = document.getElementById('complaintsBody');

    // Fetch complaints from Firestore
    db.collection('complaints').orderBy('timestamp', 'desc').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${data.rollNumber}</td>
                    <td>${data.roomNumber}</td>
                    <td>${data.problemDescription}</td>
                    <td>${new Date(data.timestamp.toDate()).toLocaleString()}</td>
                    <td><button onclick="deleteComplaint('${doc.id}')">Delete</button></td>
                `;

                complaintsBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching complaints: ", error);
        });
});

function deleteComplaint(complaintId) {
    db.collection('complaints').doc(complaintId).delete()
        .then(() => {
            alert("Complaint deleted successfully!");
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error deleting complaint: ", error);
        });
}
