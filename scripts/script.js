const loadLatestPost = async () => {
    toggleLoadingSpinner(true);

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const latestPost = data;
    displayLatestPost(latestPost)
};

const displayLatestPost = (data) => {
    // console.log(data);
    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach(data => {
        // console.log(data);
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = `latest-post-card space-y-2 p-6 border-2 border-solid border-[#12132D26] rounded-3xl`;
        latestPostCard.innerHTML = `
            <img class="rounded-3xl" src= "${data.cover_image}" alt="">
            <p class="font-mulish font-normal text-base text-[#12132D99]"><i class="fa-regular fa-calendar-check"></i> ${data.author.posted_date || "no publish date"}</p>
            <h4 class="text-[#12132D] font-mulish font-extrabold text-lg">${data.title}</h4>
            <p class="text-[#12132D99] font-mulish font-normal text-base">${data.description}</p>
            <div class="flex gap-3">
              <img class="rounded-full w-11" src="${data.profile_image}" alt="">
              <div>
                <h5 class="font-mulish font-bold text-base text-[#12132D]">${data.author.name}</h5>
                <p class="font-mulish font-normal text-sm text-[#12132D99]">${data.author.designation || "unknown"}</p>
              </div>
            </div>
        `
        setTimeout(() => {
            latestPostContainer.appendChild(latestPostCard);
        }, 2000)
    })
    toggleLoadingSpinner(false);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('toggle-loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else if (!isLoading){
        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
        }, 2000);
    }
}



loadLatestPost();
