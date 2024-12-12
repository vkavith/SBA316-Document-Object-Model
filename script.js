// Cache DOM elements
const petList = document.getElementById("petList");
const filterButtons = document.querySelectorAll(".filter-btn");
const adoptForm = document.getElementById("adoptForm");

// Pet data
const pets = [
  {
    id: 101,
    name: "Shih Tzu",
    type: "dog",
    breed: "Shih Tzu",
    age: "6 months",
    image: "https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg",
  },
  {
    id: 102,
    name: "Maltese",
    type: "dog",
    breed: "Maltese",
    age: "1 year",
    image: "https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg",
  },
  {
    id: 103,
    name: "Persian",
    type: "cat",
    breed: "Persian",
    age: "2 years",
    image: "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg",
  },
  {
    id: 104,
    name: "Singapura",
    type: "cat",
    breed: "Singapura",
    age: "3 years",
    image: "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg",
  },
  {
    id: 105,
    name: "Cavalier",
    type: "dog",
    breed: "Cavalier",
    age: "3 months",
    image: "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg",
  },
];

// Display pets function
function displayPets(filter = "all") {
  petList.innerHTML = "";

  //Create Document Fragment
  const fragment = document.createDocumentFragment();

  for (let pet of pets) {
    if (filter === "all" || pet.type === filter) {
      // Create card elements
      const card = document.createElement("div");
      card.className = "pet-card";

      // Create image
      const img = document.createElement("img");
      img.src = pet.image;
      img.alt = pet.name;
      img.className = "pet-image";

      // Create name heading
      const name = document.createElement("h3");
      name.textContent = pet.name;

      // Create info paragraph
      const info = document.createElement("p");
      info.textContent = `${pet.breed}, ${pet.age} old`;

      // Create adopt button
      const adoptBtn = document.createElement("button");
      adoptBtn.textContent = "Adopt Me";
      adoptBtn.className = "adopt-btn";
      adoptBtn.dataset.petId = pet.id;

      // Append all elements to card
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(info);
      card.appendChild(adoptBtn);

      // Append card to pet list
      //petList.appendChild(card);
      //Append card to fragment instead direct to petList
      fragment.appendChild(card);
    }
  }

  // Append fragment to petList (here just single DOM update)
  petList.appendChild(fragment);
}

// Filter button click handler
document.getElementById("filters").addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    // Remove active class from siblings
    const siblings = e.target.parentNode.children;
    for (let sibling of siblings) {
      sibling.classList.remove("active");
    }

    // Add active class to clicked button
    e.target.classList.add("active");
    displayPets(e.target.dataset.type);
  }
});

// Show adoption form
petList.addEventListener("click", (e) => {
  if (e.target.classList.contains("adopt-btn")) {
    const petId = e.target.dataset.petId;
    localStorage.setItem("selectedPetId", petId);
    adoptForm.classList.remove("hidden");
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }
});

// Form validation and submission
adoptForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  let isValid = true;

  if (name.value.length < 1) {
    name.nextElementSibling.style.display = "block";
    name.nextElementSibling.textContent = "Name must be at least 1 character";
    isValid = false;
  }

  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    email.nextElementSibling.style.display = "block";
    email.nextElementSibling.textContent = "Please enter a valid email";
    isValid = false;
  }

  if (!phone.value.match(/^[0-9]{10}$/)) {
    phone.nextElementSibling.style.display = "block";
    phone.nextElementSibling.textContent = "Phone must be 10 digits";
    isValid = false;
  }

  if (isValid) {
    const petId = localStorage.getItem("selectedPetId");
    let pet = null;
    for (let p of pets) {
      if (p.id === parseInt(petId)) {
        pet = p;
        break;
      }
    }
    window.alert(`Thank you for adopting ${pet.name}!`);
    adoptForm.reset();
    adoptForm.classList.add("hidden");
  }
});

//Make it again to Initial display
displayPets();
