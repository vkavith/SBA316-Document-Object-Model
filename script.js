const petSection = document.getElementById("pets");
const filterButton = document.querySelectorAll(".filter-buttn");
const petadoptForm = document.getElementById("adoptForm");

//Pet content data decalre in a array

const pets = [
  {
    id: 101,
    name: "dog-1",
    type: "dog",
    breed: "Shih Tzu",
    age: "6 months",
    image: "",
  },
  {
    id: 102,
    name: "dog-2",
    type: "dog",
    breed: "Maltese",
    age: "1 year",
    image: "",
  },
  {
    id: 103,
    name: "cat-1",
    type: "cat",
    breed: "Persian",
    age: "2 years",
    image: "",
  },
  {
    id: 104,
    name: "cat-2",
    type: "cat",
    breed: "Singapura",
    age: "3 years",
    image: "",
  },
  {
    id: 105,
    name: "dog-3",
    type: "dog",
    breed: "Cavalier",
    age: "3 months",
    image: "",
  },
];

function displayPets(filter = "all") {
  petSection.innerHTML = "";

  for (let petloop of pets) {
    if (filter === "all" || petloop.type === filter) {
      const card = document.createElement("div");
      card.className = "pet-card";

      card.innerHTML = `
            <img src = "${petloop.image}" alt = "${pet.name}">
            <h3>${petloop.name}</h3>
            <h4>${petloop.breed}, ${petloop.age} old </p>
            <button onclick = "displayAdoptForm(${petloop.id})"> Adopt </button>
            `;

      petSection.appendChild(card);
    }
  }
}

function displayAdoptForm(petId) {
  //find pet using for loop

  let choosePet = null;
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].id === petId) {
      choosePet = pets[i];
      break;
    }
  }

  window.alert(`Thanks for choosing this pet to adopt ${choosePet.name}!`);

  window.localStorage.setItem("checkedinPetId", petId);
  petadoptForm.classList.remove("hidden");
  petadoptForm.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

const filterSection = document.getElementById("choosepet");
filterSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-buttn")) {
    const siblings = e.target.parentNode.children;
    for (let sibloop of siblings) {
      sibloop.classList.remove("active");
    }

    e.target.classList.add("active");
    displayPets(e.target.dataset.type);
  }
});

petadoptForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  let isValid = true;
  let errorMessage = "";

  if (name.ariaValueMax.length < 1) {
    name.style.borderColor = "red";
    errorMessage += "Name should be entered  \n\n";
    isValid = false;
  }

  if (!email.value.includes("@")) {
    email.style.borderColor = "red";
    errorMessage += "Valid email should be entered \n\n";
    isValid = false;
  }

  if (!phone.value.match(/^[0-9]{10}$/)) {
    phone.style.borderColor = "red";
    errorMessage += "Phone number should be 10 digits \n\n";
    isValid = false;
  }

  if (!isValid) {
    //Validation alert message
    window.alert(errorMessage);
    return;
  }

  const petId = localStorage.getItem("checkedinPetId");
  let pet = null;
  for (let p of pets) {
    if (p.id === parseInt(petId)) {
      pet = p;
      break;
    }
  }
  //Fires when user resets a form
  petadoptForm.reset();

  petadoptForm.classList.add("hidden");
});

window.onload = () => {
  displayPets();
  window.alert("Welcome to Pet Store! Find your adorable companion");
};
