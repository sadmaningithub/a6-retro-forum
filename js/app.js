const loadPost = async (searchText = '') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json();
    const loadedPosts = data.posts
    // console.log(loadedPosts)
    displayPosts(loadedPosts)
    // postInteraction(loadedPosts)
}

const displayPosts = (loadedPosts) => {

    const postContainer = document.getElementById('post-container')

    postContainer.textContent = ''

    loadedPosts.forEach(post => {
        // console.log(post)
        const postCard = document.createElement('div')
        postCard.classList = `flex flex-col lg:flex-row items-center p-10 bg-[#F3F3F5] rounded-3xl`
        postCard.innerHTML = ` <div class="flex flex-col lg:flex-row items-center bg-[#F3F3F5] rounded-3xl">
        <div>
            <div class="avatar offline">
                <div class="w-24 rounded-xl">
                    <img src="${post.image}" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="flex flex-row gap-10 text-[#12132DCC] text-sm roboto-medium">
                <h4> # <span>${post.category}</span> </h4>
                <h4>Author : ${post.author.name}</h4>
            </div>

            <h2 class="card-title roboto-bold text-xl">${post.title}</h2>
            <p class="text-base	roboto-regular text-[#12132D99]">${post.description}</p>
            <hr class="border-dashed">
            <div class="card-actions flex flex-row justify-between">
                <div class="flex flex-row gap-4 text-[#12132D99] roboto-regular">
                    <div class="flex flex-row items-center gap-1">
                        <div><img src="images/tabler-icon-message-2.png" alt=""></div>
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex flex-row items-center gap-1">
                        <div><img src="images/tabler-icon-eye.png" alt=""></div>
                        <p>${post.view_count}</p>
                    </div>
                    <div class="flex flex-row items-center gap-1">
                        <div><img src="images/tabler-icon-clock-hour-9.png" alt=""></div>
                        <p>${post.posted_time}</p>
                    </div>
                </div>

                <button onclick="markRead('${post.title}','${post.view_count}')" class=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                        viewBox="0 0 28 28" fill="none">
                        <path
                            d="M13.9998 0C6.26805 0 9.15527e-05 6.26814 9.15527e-05 13.9999C9.15527e-05 21.7314 6.26805 28 13.9998 28C21.7315 28 27.9999 21.7314 27.9999 13.9999C27.9999 6.26814 21.7315 0 13.9998 0ZM14 4.91741L22.2847 10.0835H5.71542L14 4.91741ZM22.3879 18.333H22.3871C22.3871 19.1616 21.7155 19.8331 20.887 19.8331H7.1131C6.28447 19.8331 5.61303 19.1615 5.61303 18.333V10.4122C5.61303 10.3245 5.62199 10.2393 5.63655 10.1556L13.552 15.0914C13.5617 15.0975 13.5721 15.1016 13.5821 15.1072C13.5925 15.113 13.6032 15.1186 13.6138 15.1239C13.6697 15.1527 13.7273 15.176 13.7862 15.1912C13.7923 15.1929 13.7983 15.1936 13.8044 15.195C13.869 15.2102 13.9344 15.2197 13.9998 15.2197H14.0002C14.0007 15.2197 14.0012 15.2197 14.0012 15.2197C14.0665 15.2197 14.1319 15.2105 14.1965 15.195C14.2026 15.1935 14.2086 15.1929 14.2147 15.1912C14.2735 15.176 14.3309 15.1527 14.3871 15.1239C14.3977 15.1186 14.4084 15.113 14.4188 15.1072C14.4287 15.1016 14.4392 15.0975 14.4489 15.0914L22.3644 10.1556C22.3789 10.2393 22.3879 10.3244 22.3879 10.4122V18.333Z"
                            fill="#10B981" />
                    </svg> </button>
            </div>
        </div>


    </div>`

        postContainer.appendChild(postCard)

    })

    setTimeout(() => {
        toggleSpinner(false)
    }, 2000)

}

const markRead = (title, view) => {
    const readingDetails = document.getElementById('reading-details')
    const readNum = document.getElementById('read-count')
    
    const readNumText = readNum.innerText
    const convrtNum = parseInt(readNumText)

    const newNum = convrtNum + 1
    readNum.innerText = newNum
    // console.log(convrtNum)

    const detailsDiv = document.createElement('div')
    detailsDiv.classList = `flex flex-row justify-between bg-[#FFF] p-4 rounded-2xl`
    detailsDiv.innerHTML = `<h1 class="text-base roboto-medium">${title}</h1>
    <h1 class="flex flex-row items-center gap-2 text-[#12132D99] text-base roboto-regular"><img
            src="images/tabler-icon-eye.png" alt=""> ${view}</h1>`
    readingDetails.appendChild(detailsDiv)

    
}



const searchText = () => {
    toggleSpinner(true)
    const textElement = document.getElementById('search-text')
    const searchText = textElement.value
    loadPost(searchText)
}

const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner')
    if (isLoading) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')
    }
}

const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();
    displayLatestPost(data)
}

const displayLatestPost = (data) => {
    const latestContainer = document.getElementById('latest-post-container')

    data.forEach(post => {
        const latestCard = document.createElement('div')
        latestCard.classList = `card bg-base-100 shadow-xl p-6 rounded-xl`
        latestCard.innerHTML = `<figure><img src="${post.cover_image}" alt="Shoes" />
        </figure>
        <div class="card-body space-y-4">

            <div class="flex flex-row gap-3 text-[#12132D99]">
                <img src="images/date.png" alt="">
                <p>
                    ${post.author.posted_date}
                </p>
            </div>
            <h2 class="card-title text-lg roboto-bold">${post.title}</h2>
            <p class="text-base roboto-regular text-[#12132D99]">${post.description}</p>
            <div class="flex flex-row gap-5">
                <div class="avatar">
                    <div class="w-14 rounded-full">
                      <img src="${post.profile_image}" alt="Tailwind-CSS-Avatar-component" />
                    </div>
                  </div>
                <div class="text-base">
                    <h6 class="roboto-bold">${post.author.name}</h6>
                    <h6 class="text-[#12132D99] roboto-regular">${post.author.designation}</h6>
                </div>
            </div>
        </div>`

        latestContainer.appendChild(latestCard)
    })
}

loadPost()
loadLatestPost()