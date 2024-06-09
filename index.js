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
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the sub buttons
    initializeDefault('button1', 'div1', 'sub');

    // Initialize the year buttons
    initializeDefault('button1', 'div1', 'year');
});

function initializeDefault(defaultButtonId, defaultDivId, buttonType) {
    const hash = window.location.hash;
    const defaultButton = document.getElementById(defaultButtonId);
    const defaultDiv = document.getElementById(defaultDivId);

    if (hash) {
        const targetDiv = hash.substring(1);
        const targetButton = document.querySelector(`.${buttonType}[onclick*="${targetDiv}"]`);
        if (targetButton) {
            toggleDiv(targetDiv, targetButton);
        } else {
            defaultButton.classList.add('active');
            defaultDiv.style.display = 'block';
        }
    } else {
        defaultButton.classList.add('active');
        defaultDiv.style.display = 'block';
    }
}

function toggleDiv(divId, button) {
    const isSub = button.classList.contains('sub');
    const buttonClass = isSub ? 'sub' : 'year';
    const divs = document.querySelectorAll('.content-div');
    const buttons = document.querySelectorAll(`.${buttonClass}`);

    divs.forEach(div => div.style.display = 'none');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(divId).style.display = 'block';
    button.classList.add('active');

    window.location.hash = divId;
}


document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".timeline ul li");

    const isInViewport = el => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const run = () => {
        items.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add("show");
            }
        });
    };

    window.addEventListener("load", run);
    window.addEventListener("resize", run);
    window.addEventListener("scroll", run);
});
