// re-useable function
const getID = (id) => {
  return document.getElementById(id);
};

const cartsContainer = getID("cart_container");

const fromAPI = async (id) => {
  const url = id;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// spinner control
const spinnerControl = (status) => {
  const spinner = getID("spinner");
  if (status == true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// remove active btns styles
const removeActive = () => {
  const activeBtn = document.querySelectorAll(".active_btn");
  activeBtn.forEach((btn) => {
    btn.classList.remove(
      "bg-transparent",
      "bg-[#0E7A81]",
      "text-white",
      "hover:bg-[#0e798120]",
      "hover:bg-[#0E7A81]"
    );
  });
};

// show Via Category
const showCategoryViaID = async (id) => {
  removeActive();

  const activeBtn = getID(`${id}_btn`);
  activeBtn.classList.add("bg-[#0E7A81]", "text-white", "hover:bg-[#0E7A81]");
  //   const btns = document.querySelectorAll(".active_btn");
  cartsContainer.innerHTML = "";
  spinnerControl(true);
  const url = `https://openapi.programming-hero.com/api/peddy/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const pats = data.data;
  pats.forEach((pats) => {
    const newCart = document.createElement("div");
    newCart.innerHTML = `
             <div
                class="bg-white p-4 rounded-xl shadow text-left flex flex-col gap-y-1.5"
              >
                <div
                  class="h-52 bg-gray-200 rounded overflow-hidden md:h-36 flex items-center justify-center"
                >
                  <img class="w-full" src="${pats.image}" alt="" />
                </div>
                <h3
                  class="font-semibold mt-3  text-xl"
                >
                ${pats.pet_name}
                </h3>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-wind"></i> Breed: ${pats.breed}
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-calendar"></i> Birth: ${pats.date_of_birth}
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-venus-double"></i> Gender: ${pats.gender}
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-dollar-sign"></i> Price : ${pats.price}$
                </p>
                <div class="flex justify-between mt-5">
                      <button class="btn border border-[#0e798130] bg-[#0e798105]  text-[#0E7A81] font-bold hover:bg-[#0e798144]">
                         <i class="fa-solid fa-heart"></i>
                      </button>
                      <button class="btn border border-[#0e798130] bg-[#0e798105] text-[#0E7A81] font-bold hover:bg-[#0e798144] ">
                         Adopt
                      </button>
                      <button class="btn border border-[#0e798130] bg-[#0e798105] text-[#0E7A81] font-bold hover:bg-[#0e798144] ">
                         Details
                      </button>
                </div>
              </div>
          `;
    cartsContainer.appendChild(newCart);
  });

  // no info massage
  if (pats.length == 0) {
    cartsContainer.innerHTML = `
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 col-span-3">
        <div class="col-span-full bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 md:p-16 text-center">
            <div class="flex flex-col items-center justify-center">
            
                <img src="images/error.webp" alt="">
                
                <h2 class="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
                   No Information Available
                </h2>
                
                <p class="text-base md:text-lg text-gray-500 max-w-md">
                   It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                    its layout. The point of using Lorem Ipsum is that it has a.
                </p>
            </div>
        </div>
    </div>
    `;
  }
  spinnerControl(false);
};

// load btns
const loadBtns = async () => {
  const btnContainer = getID("btn_container");
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  const res = await fetch(url);
  const data = await res.json();
  const btns = data.categories;

  btns.forEach((btn) => {
    const newDiv = document.createElement("button");
    newDiv.innerHTML = `
        <button id="${btn.category}_btn" onClick="showCategoryViaID('${btn.category}')"
        class="btn w-[212px] h-16 flex items-center justify-center flex-row gap-3 rounded-4xl text-black text-xl border-[#0e798120] bg-transparent p-7 hover:bg-[#0e798120] hover:border-[#0E7A81] active_btn ">
            <img src="${btn.category_icon}" alt="logo" class="w-8"/>
            ${btn.category}
         </button>
  `;
    btnContainer.appendChild(newDiv);
  });
};

// all Pats cart & photo
const loadCartsSideIMG = async () => {
  spinnerControl(true);
  const photoContainer = getID("photo_container");
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  const pats = data.pets;
  pats.forEach((pats) => {
    // all pats cart
    /** {
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
} */
    const newCart = document.createElement("div");
    newCart.innerHTML = `
             <div
                class="bg-white p-4 rounded-xl shadow text-left flex flex-col gap-y-1.5"
              >
                <div
                  class="h-52 bg-gray-200 rounded overflow-hidden md:h-36 flex items-center justify-center"
                >
                  <img class="w-full" src="${pats.image}" alt="" />
                </div>
                <h3
                  class="font-semibold mt-3  text-xl"
                >
                ${pats.pet_name ?? "Not Available"}
                </h3>
                <p class="text-sm text-gray-500">
                 <i class="fa-solid fa-paw w-5 text-center text-gray-400"></i> Breed: ${
                   pats.breed ?? "Not Available"
                 }
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-calendar"></i> Birth: ${
                    pats.date_of_birth ?? "Not Available"
                  }
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-venus-double"></i> Gender: ${
                    pats.gender ?? "Not Available"
                  }
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fa-solid fa-dollar-sign"></i> Price : ${
                    pats.price ?? "Not Available"
                  }$
                </p>
                <div class="flex justify-between mt-5">
                      <button class="btn border border-[#0e798130] bg-[#0e798105]  text-[#0E7A81] font-bold hover:bg-[#0e798144]">
                         <i class="fa-solid fa-heart"></i>
                      </button>
                      <button class="btn border border-[#0e798130] bg-[#0e798105] text-[#0E7A81] font-bold hover:bg-[#0e798144] ">
                         Adopt
                      </button>
                      <button onClick="pet_details('${
                        pats.petId ?? "Not Available"
                      }')" class="btn border border-[#0e798130] bg-[#0e798105] text-[#0E7A81] font-bold hover:bg-[#0e798144] ">
                         Details
                      </button>
                </div>
              </div>
          `;

    cartsContainer.appendChild(newCart);
    spinnerControl(false);

    // pates side photo load
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
     <img
        class="rounded-xl"
        src="${pats.image}"
        alt="pat"
     />
    `;
    photoContainer.appendChild(newDiv);
  });
};

const pet_details = async (id) => {
  /** {
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
} */
  my_modal_1.showModal();
  const modalDescription = getID("modal_container");
  modalDescription.innerHTML = "";
  spinnerControl(true);
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const pats = data.petData;
  const newModal = document.createElement("div");
  newModal.innerHTML = `
  <div class="max-w-md w-full bg-white">
        
        <div>
            <img src="${pats.image}" 
                 alt="${pats.pet_name ?? "Not Available"}" 
                 class="w-full h-64 object-cover rounded-lg">
        </div>

        <div class="mt-6">
            <h1 class="text-3xl font-bold text-gray-800">${
              pats.pet_name ?? "Not Available"
            }</h1>
        </div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 text-gray-600">
            
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-paw w-5 text-center text-gray-400"></i>
                <span>Breed: <span class="font-semibold text-gray-700">${
                  pats.breed ?? "Not Available"
                }</span></span>
            </div>
            
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-calendar-days w-5 text-center text-gray-400"></i>
                <span>Birth: <span class="font-semibold text-gray-700">${
                  pats.date_of_birth ?? "Not Available"
                }</span></span>
            </div>

            <div class="flex items-center space-x-2">
                 <i class="fa-solid fa-venus w-5 text-center text-gray-400"></i>
                 <span>Gender: <span class="font-semibold text-gray-700">${
                   pats.gender ?? "Not Available"
                 }</span></span>
            </div>

            <div class="flex items-center space-x-2">
                 <i class="fa-solid fa-dollar-sign w-5 text-center text-gray-400"></i>
                 <span>Price: <span class="font-semibold text-gray-700">$${
                   pats.price ?? "Not Available"
                 }</span></span>
            </div>

            <div class="flex items-center space-x-2 col-span-2">
                <i class="fa-solid fa-syringe w-5 text-center text-gray-400"></i>
                <span>Vaccinated status: <span class="font-semibold text-gray-700">${
                  pats.vaccinated_status ?? "Not Available"
                }</span></span>
            </div>
        </div>
        
        <hr class="my-6">
        
        <div>
            <h2 class="text-xl font-bold text-gray-800">Details Information</h2>
            <div class="mt-2 space-y-3 text-gray-600">
                <p>
                   ${pats.pet_details ?? "Not Available"}
                </p>
                
            </div>
        </div> 
    </div>
  `;
  modalDescription.appendChild(newModal);
  spinnerControl(false);
};

// default function call
loadBtns();
loadCartsSideIMG();
