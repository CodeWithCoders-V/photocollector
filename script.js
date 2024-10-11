// Handle the photo upload
document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    const photoInput = document.getElementById("photoInput");
    
    if (photoInput.files.length === 0) {
        alert("Please select a photo to upload.");
        return;
    }
    
    const files = photoInput.files; // Get all selected files
    const promises = []; // Array to hold file reading promises

    // Read each selected file
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        promises.push(new Promise((resolve) => {
            reader.onload = function (e) {
                const imgData = e.target.result;
                
                // Save photo in local storage
                savePhoto(imgData);
                resolve(); // Resolve the promise after saving the photo
            }
            reader.readAsDataURL(file);
        }));
    }

    // Show success modal with animation after all photos are uploaded
    Promise.all(promises).then(() => {
        showModal();
    });

    photoInput.value = ""; // Clear input after reading the files
});

// Save uploaded photo to local storage
function savePhoto(imgData) {
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos.push(imgData);
    localStorage.setItem("photos", JSON.stringify(photos));
}

// Redirect to the gallery page
document.getElementById("viewPhotosBtn").addEventListener("click", function () {
    window.location.href = "gallery.html"; // Redirect to gallery page
});

// Show the success modal with checkmark animation
function showModal() {
    const modal = document.getElementById("successModal");
    modal.style.display = "block";

    // Close the modal when the user clicks on the "x" button
    document.querySelector(".close").addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}
