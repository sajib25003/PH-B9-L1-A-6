const loadAllPost = async (searchText = "") => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const allPost = data.posts;
    displayAllPost(allPost)
};

const displayAllPost = (data) => {
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.textContent = '';
    data.forEach(data => {
        let title = data.title;
        console.log (title);
        title = title.replace("'","");
        console.log(title)
        let status = '';
        if (data.isActive) {
            status = `<div id="active-status" 
            class="w-4 h-4 rounded-full bg-green-500 absolute left-[85%] bottom-[85%] border-2 border-white"
          ></div>`
        }
        else {
            status = `<div id="active-status" 
            class="w-4 h-4 rounded-full bg-red-500 absolute left-[85%] bottom-[85%] border-2 border-white"
          ></div>`
        }
        const allPostCard = document.createElement('div');
        allPostCard.classList = `space-y-4 p-4 lg:p-10 bg-[#797DFC1A] border-none rounded-[24px] lg:min-w-[770px] flex flex-col lg:flex-row gap-4 lg:gap-10 items-start"
        `;
        allPostCard.innerHTML = `
     
        <div class="relative  w-[72px] h-[72px]">
          <img
            class="w-[72px] h-[72px] rounded-2xl relative"
            src="${data.image}"
            alt=""
          />
          ${status}
        </div>
        <div class="space-y-4">
          <div
            class="flex items-start gap-5 font-inter text-sm font-medium text-[#12132DCC]"
          >
            <p># ${data.category}</p>
            <p>Author: ${data.author.name}</p>
          </div>
          <div
            class="border-b-2 border-dashed border-[#12132D40] space-y-4 pb-4 lg:w-[600px]"
          >
            <h4 id="data-title" class="font-mulish text-[#12132D] font-bold text-xl">
              ${data.title}
            </h4>
            <p class="font-inter text-[#12132D99] font-normal text-base">
              ${data.description}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex justify-between gap-5">
              <p
                class="text-[#12132D99] font-inter font-normal text-base"
              >
                <i
                  class="fa-regular fa-message"
                  style="color: #12132d99"
                ></i>
                ${data.comment_count}
              </p>
              <p
                class="text-[#12132D99] font-inter font-normal text-base"
              >
                <i class="fa-regular fa-eye" style="color: #12132d99"></i>
                ${data.view_count}
              </p>
              <p
                class="text-[#12132D99] font-inter font-normal text-base"
              >
                <i
                  class="fa-regular fa-clock"
                  style="color: #12132d99"
                ></i>
                ${data.posted_time} min
              </p>
            </div>
            <button id="read-button" onclick="displayClickedPost('${title}', '${data.view_count}', this)" 
              class="btn bg-[#10B981] rounded-full border-none h-8 w-12 text-center"
            >
              <i class="fa-solid fa-envelope-open fa-xl"></i>
            </button>

          </div>
        </div>

        `

        allPostContainer.appendChild(allPostCard);

    })
}

// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadAllPost(searchText);
}

// data to right side

const title = document.getElementById('data-title');
const clickedContainer = document.getElementById('clicked-container');
const clickCount = document.getElementById('click-count');
let viewCount = 0;
clickCount.innerText = viewCount;

const displayClickedPost = (title, count, click) => {
    console.log(title, count);
    const clickedCard = document.createElement('div');

    clickedCard.classList = `space-y-4`;
    clickedCard.innerHTML = `
        
        <div
        class="p-4 bg-white border-none rounded-2xl flex justify-between gap-10 my-4 items-center"
        >
        <h4 class="font-mulish text-base font-extrabold text-[#12132D]">
            ${title}
        </h4>
        <p class="text-[#12132D99] font-inter font-normal text-base w-28">
            <i class="fa-regular fa-eye" style="color: #12132d99"></i> ${count}
        </p>
        </div>
  `
    clickedContainer.appendChild(clickedCard)
    viewCount++;
    console.log(viewCount);
    clickCount.innerText = viewCount;
    click.disabled = true;

    
}


loadAllPost();