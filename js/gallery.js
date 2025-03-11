document.addEventListener("DOMContentLoaded", function () {
    // URL에서 bo_table 값 확인
    function getBoTableValue() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('bo_table');
    }

    // 샘플 이미지 (나중에 서버에서 가져올 경우 AJAX 사용 가능)
    const sampleImages = [
        "https://source.unsplash.com/random/200x200?nature",
        "https://source.unsplash.com/random/200x200?water",
        "https://source.unsplash.com/random/200x200?sky",
        "https://source.unsplash.com/random/200x200?flower",
        "https://source.unsplash.com/random/200x200?mountain",
        "https://source.unsplash.com/random/200x200?beach"
    ];

    // 갤러리 생성 함수
    function renderGallery() {
        let galleryHtml = "";
        sampleImages.forEach(imgUrl => {
            galleryHtml += `
                <div class="gallery-item">
                    <img src="${imgUrl}" alt="Gallery Image">
                </div>
            `;
        });
        document.getElementById("galleryGrid").innerHTML = galleryHtml;
    }

    // bo_table이 gallery라면 실행
    if (getBoTableValue() === "gallery") {
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
        renderGallery();
    }  else if (getBoTableValue() === "consult") {
        // document.querySelector(".all_wrap").style.display = "none"; // 기존 메인 콘텐츠 숨기기
        document.querySelector("#index_main").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("galleryContainer").style.display = "none"; // 갤러리 표시
        document.querySelector("#greeting").style.display = "none"; // 기존 메인 콘텐츠 숨기기기기
        document.getElementById("consult").style.display = "block"; // 기존 메인 콘텐츠 숨기기기기
        renderGallery();
    }
});
