fetch("/api/reviews").then(response => {
    if (response.status === 200) {
        response.json().then(data => {
            renderReviews(data);
        });
    } else {
        alert('An error occurred. Please try again.');
    }
});

function renderReviews(data) {
    const elementToRender = document.getElementById('reviews-list');
    // Clear previous content
    elementToRender.innerHTML = '';

    data.forEach(review => { 
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'grid grid-cols-12 max-w-sm sm:max-w-full mx-auto pb-8 border-b border-gray-100';
        reviewDiv.innerHTML = `
            <div class="col-span-12 lg:col-span-10">
                <div class="sm:flex gap-6">
                    <img src="assets/images/elon-musk.jpg" alt="${review.username} image" class="w-32 h-32 rounded-full">
                    <div class="text w-40">
                        <p class="font-medium text-lg leading-8 text-gray-900 mb-2">${review.username}</p>
                        <div class="flex items-center gap-2 lg:justify-between w-full mb-5">
                            ${generateRatingStars(review.rating)}
                        </div>
                        <p class="font-normal text-base leading-7 text-gray-400 mb-4 lg:pr-8">${review.comment}</p>
                        <div class="flex items-center justify-between">
                            <div class="cursor-pointer flex items-center gap-2">
                                <a href="javascript:;" class="font-semibold text-lg leading-8 text-indigo-600 whitespace-nowrap">View & Reply</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5"
                                        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p class="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                                ${new Date(review.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        elementToRender.appendChild(reviewDiv);
    });
}

function generateRatingStars(rating) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path fill="#FBBF24" d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"/>
            </svg>`;
        } else {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path fill="#E5E7EB" d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"/>
            </svg>`;
        }
    }
    return starsHtml;
}
