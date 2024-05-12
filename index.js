window.addEventListener("load", function () {
    let scrollContainer = document.querySelector(".box");
    let startX, scrollStartX;

    scrollContainer.addEventListener('touchstart', function (e) {
        startX = e.touches[0].pageX;
        scrollStartX = this.scrollLeft;
    }, false);

    scrollContainer.addEventListener('touchmove', function (e) {
        e.preventDefault();
        let touch = e.touches[0];
        let deltaX = touch.pageX - startX;
        this.scrollLeft = scrollStartX - deltaX;
    }, false);
});
document.addEventListener('DOMContentLoaded', function () {
    setupScrolling('contentBox1', 'backBtn1', 'nextBtn1');
    setupScrolling('contentBox2', 'backBtn2', 'nextBtn2');
});

function setupScrolling(scrollContainerId, backBtnId, nextBtnId) {
    let scrollContainer = document.getElementById(scrollContainerId);
    let backBtn = document.getElementById(backBtnId);
    let nextBtn = document.getElementById(nextBtnId);
    const scrollLengths = {
        small: 267,
        large: 440
    };
    const getResponsivenessLevel = () => {
        const width = window.innerWidth;
        if (width < 840) {
            return "small";
        } else {
            return "large";
        }
    };
    nextBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth";
        const scrollLength = scrollLengths[getResponsivenessLevel()];
        scrollContainer.scrollLeft += scrollLength;
    });
    backBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth";
        const scrollLength = scrollLengths[getResponsivenessLevel()];
        scrollContainer.scrollLeft -= scrollLength;
    });
    window.addEventListener("resize", () => {
        const scrollLength = scrollLengths[getResponsivenessLevel()];
    });
}

function createPreviews() {
    document.querySelectorAll('.modal-container').forEach(modal => {
        let fullText = modal.querySelector('.full-text').innerText;
        let containerWidth = modal.offsetWidth;
        let maxLength;
        if (containerWidth <= 400) {
            maxLength = 180;
        } else if (containerWidth <= 800) {
            maxLength = 300;
        } else {
            maxLength = 500;
        }

        let previewId = modal.id.replace('modal', 'preview');
        let truncatedText = fullText.length > maxLength ? fullText.substring(0, maxLength) + '...' : fullText;

        document.getElementById(previewId).innerText = truncatedText;
    });
}


window.onload = createPreviews;

document.querySelectorAll('.open').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        modal.classList.add('active');
    });
});

document.querySelectorAll('.modal-container .close').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal-container');
        modal.classList.remove('active');
    });
});

function toggleQuickMenu() {
    const quickMenuContent = document.getElementById('quickMenuContent');
    if (quickMenuContent.style.display === 'none') {
        quickMenuContent.style.display = 'block';
    } else {
        quickMenuContent.style.display = 'none';
    }
}

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function () {
    const quickMenu = document.getElementById('quickMenuContent');
    quickMenu.style.display = 'none';
});
