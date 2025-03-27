document.addEventListener("DOMContentLoaded", function () {
    // URL에서 bo_table 값 확인
    function getBoTableValue() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('page');
    }

    const sampleImages = [];
    for (let i = 1; i <= 109; i++) {
        sampleImages.push(`img/waterproofing-construction-${i}.webp`);
    }

    const imagesPerPage = 6;
    let currentPage = 1;
    const totalPages = Math.ceil(sampleImages.length / imagesPerPage);

    // bo_table이 gallery라면 실행
    if (getBoTableValue() === "gallery") {
        // 갤러리 생성 함수
        function renderGallery() {
            let galleryHtml = "";
            const startIndex = (currentPage - 1) * imagesPerPage;
            const endIndex = Math.min(startIndex + imagesPerPage, sampleImages.length);
            for (let i = startIndex; i < endIndex; i++) {
                galleryHtml += `
                    <div class="gal-item">
                        <img src="${sampleImages[i]}" alt="방수공사-사례-${i + 1}">
                    </div>
                `;
            }
            document.getElementById("galGrid").innerHTML = galleryHtml;
            renderPagination();
        }

        function renderPagination() {
            let paginationHtml = '<div class="pg_wrap"><div class="pg">';

            // // First and Previous buttons
            // if (currentPage > 1) {
            //     paginationHtml += `<a href="#" class="pg_start" data-page="1">처음</a>`;
            //     paginationHtml += '<a href="#" class="pg_prev" data-page="${currentPage - 1}"></a>';
            // } else {
            //     paginationHtml += `<span class="pg_start">처음</span>`;
            //     paginationHtml += '<span class="pg_prev">이전</span>';
            // }

            // Page numbers
            for (let page = 1; page <= totalPages; page++) {
                if (page === currentPage) {
                    paginationHtml += `<span class="pg_current">${page}</span>`;
                } else {
                    paginationHtml += `<a href="#" class="pg_page" data-page="${page}">${page}</a>`;
                }
            }

            // // Next and End buttons
            // if (currentPage < totalPages) {
            //     paginationHtml += `<a href="#" class="pg_next" data-page="${currentPage + 1}">다음</a>`;
            //     paginationHtml += `<a href="#" class="pg_end" data-page="${totalPages}">끝</a>`;
            // } else {
            //     paginationHtml += `<span class="pg_next">다음</span>`;
            //     paginationHtml += `<span class="pg_end">끝</span>`;
            // }

            paginationHtml += '</div></div>';
            document.getElementById("paginationContainer").innerHTML = paginationHtml;
            const pageLinks = document.querySelectorAll("#paginationContainer a");
            pageLinks.forEach(link => {
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    currentPage = parseInt(this.getAttribute("data-page"));
                    renderGallery();
                });
            });
        }

        // document.querySelector(".all_wrap").style.display = "none"; // 기존 메인 콘텐츠 숨기기
        document.querySelector("#index_main").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("galleryContainer").style.display = "block"; // 갤러리 표시
        document.querySelector("#greeting").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("consult").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기        
        renderGallery();
    }  else if (getBoTableValue() === "greeting") {
        // document.querySelector(".all_wrap").style.display = "none"; // 기존 메인 콘텐츠 숨기기
        document.querySelector("#index_main").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("galleryContainer").style.display = "none"; // 갤러리 표시
        document.querySelector("#greeting").style.display = "block"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("consult").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
    }  else if (getBoTableValue() === "consult") {
        // document.querySelector(".all_wrap").style.display = "none"; // 기존 메인 콘텐츠 숨기기
        document.querySelector("#index_main").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("galleryContainer").style.display = "none"; // 갤러리 표시
        document.querySelector("#greeting").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("consult").style.display = "block"; // 기존 메인 콘텐츠 숨기기기기
    } else  {
        // document.querySelector(".all_wrap").style.display = "none"; // 기존 메인 콘텐츠 숨기기
        document.querySelector("#index_main").style.display = "block"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("galleryContainer").style.display = "none"; // 갤러리 표시
        document.querySelector("#greeting").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("consult").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
    }
});
