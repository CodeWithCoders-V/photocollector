// Retrieve photos from local storage
let photos = JSON.parse(localStorage.getItem("photos")) || [];

// Display photos in the gallery
const photoGallery = document.getElementById("photoGallery");
displayPhotos();

// Function to display photos
function displayPhotos() {
    photoGallery.innerHTML = ""; // Clear the gallery

    photos.forEach((photo, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const img = document.createElement("img");
        img.src = photo;
        img.alt = "Uploaded Photo";
        img.classList.add("thumbnail"); // Add class for styling

        // Add click event to show large photo
        img.addEventListener("click", function () {
            showLargePhoto(photo);
        });

        // Create and configure delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            deletePhoto(index); // Call delete function with the current index
        });

        // Append the image and delete button to the container
        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteBtn);
        photoGallery.appendChild(imgContainer);
    });
}

// Show the large photo in a modal
function showLargePhoto(src) {
    const modal = document.getElementById("largePhotoModal");
    const largePhoto = document.getElementById("largePhoto");
    modal.style.display = "flex";
    largePhoto.src = src;

    // Close the modal when clicking the close button
    document.querySelector(".close").addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the photo
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Function to delete photo from local storage
function deletePhoto(index) {
    photos.splice(index, 1); // Remove the photo at the given index
    localStorage.setItem("photos", JSON.stringify(photos)); // Update local storage
    displayPhotos(); // Refresh the photo gallery
}

// Back to home button functionality
document.getElementById("backBtn").addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to index page
});

// Display photos when the page loads
window.onload = function() {
    displayPhotos(); // Call function to display photos
};
