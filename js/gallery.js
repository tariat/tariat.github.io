document.addEventListener("DOMContentLoaded", function () {
    // URL에서 bo_table 값 확인
    function getBoTableValue() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('page');
    }

    // 샘플 이미지 (나중에 서버에서 가져올 경우 AJAX 사용 가능)
    const sampleImages = [
        "img/waterproofing-construction-1.webp",
        "img/waterproofing-construction-2.webp",
        "img/waterproofing-construction-3.webp",
        "img/waterproofing-construction-4.webp",
        "img/waterproofing-construction-5.webp",
        "img/waterproofing-construction-6.webp",
        "img/waterproofing-construction-7.webp",
        "img/waterproofing-construction-8.webp",
        "img/waterproofing-construction-9.webp",
        "img/waterproofing-construction-10.webp",
        "img/waterproofing-construction-12.webp",
        "img/waterproofing-construction-13.webp",
        "img/waterproofing-construction-14.webp",
        "img/waterproofing-construction-15.webp",
        "img/waterproofing-construction-16.webp",
        "img/waterproofing-construction-17.webp",
        "img/waterproofing-construction-18.webp",
        "img/waterproofing-construction-19.webp",
        "img/waterproofing-construction-20.webp",
        "img/waterproofing-construction-21.webp",
        "img/waterproofing-construction-22.webp",
        "img/waterproofing-construction-23.webp",
        "img/waterproofing-construction-24.webp",
        "img/waterproofing-construction-25.webp",
        "img/waterproofing-construction-26.webp",
        "img/waterproofing-construction-27.webp",
        "img/waterproofing-construction-28.webp",
        "img/waterproofing-construction-29.webp",
        "img/waterproofing-construction-30.webp",
        "img/waterproofing-construction-31.webp"
      ];

    // bo_table이 gallery라면 실행
    if (getBoTableValue() === "gallery") {
        // 갤러리 생성 함수
        function renderGallery() {
            let galleryHtml = "";
            sampleImages.forEach((imgUrl, index) => {
                galleryHtml += `
                    <div class="gal-item">
                        <img src="${imgUrl}" alt="방수공사-사례-${index + 1}">
                    </div>
                `;
            });
            document.getElementById("galGrid").innerHTML = galleryHtml;
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
