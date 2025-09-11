// re-useable function
const getID = (id) => {
  return document.getElementById(id);
};

const loadBtns = async () => {
  const btnContainer = getID("btn_container");
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  const res = await fetch(url);
  const data = await res.json();
  const btns = data.categories;

  btns.forEach((btn) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <button
        class="btn w-[212px] h-16 flex items-center justify-center flex-row gap-3 rounded-4xl text-black text-xl border-[#0e798120] bg-transparent p-7 hover:bg-[#0e798120] hover:border-[#0E7A81]">
            <img src="${btn.category_icon}" alt="logo" class="w-8"/>
            ${btn.category}
         </button>
  `;
    btnContainer.appendChild(newDiv);
  });
};

// default function call
loadBtns();
