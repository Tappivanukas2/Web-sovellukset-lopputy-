
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 6000); // Change image every 3 seconds
}

function changeImageBasedOnH2() {
    const h2Element = document.querySelector('h2');
    const imageFrame = document.getElementById('imageFrame');
    let currentIndex = 0;
    let images = [];

    function updateImagesArray() {
        switch(h2Element.textContent) {
            case 'Kaitsajoki':
                images = [
                    'assets/images/kaitsajoki1.jpg',
                    'assets/images/kaitsajoki2.jpg',
                    'assets/images/kaitsajoki3.jpg',
                    'assets/images/kaitsajoki4.jpg'
                ];
                break;
            case 'Sandfjordelva':
                images = [
                    'assets/images/sandfjordelva1.jpg',
                    'assets/images/sandfjordelva2.jpg',
                    'assets/images/sandfjordelva3.jpg',
                    'assets/images/sandfjordelva4.jpg'
                ];
                break;
            case 'Vuollajohka':
                images = [
                    'assets/images/vuollajohka1.jpg',
                    'assets/images/vuollajohka2.jpg',
                    'assets/images/vuollajohka3.jpg',
                    'assets/images/vuollajohka4.jpg'
                ];
                break;
            case 'Valtijoki':
                images = [
                    'assets/images/valtijoki1.jpg',
                    'assets/images/valtijoki2.jpg',
                    'assets/images/valtijoki3.jpg',
                    'assets/images/valtijoki4.jpg'
                ];
                break;
            default:
                images = [
                    'assets/images/default1.jpg',
                    'assets/images/default2.jpg',
                    'assets/images/default3.jpg',
                    'assets/images/default4.jpg'
                ];
        }
    }

    function updateImage() {
        if (imageFrame) {
            imageFrame.src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length;
        }
    }

    function startImageRotation() {
        updateImagesArray();
        updateImage();
        setInterval(updateImage, 6000);
    }
    // Start the image rotation
    startImageRotation();

    // Watch for changes in the h2 element
    const observer = new MutationObserver(() => {
        currentIndex = 0;
        startImageRotation();
    });

    observer.observe(h2Element, { childList: true, characterData: true, subtree: true });
}

// Call the function when the page loads
window.addEventListener('load', changeImageBasedOnH2);

function updateH2FromDropdown() {
    const dropdown = document.getElementById('locationDropdown');
    const h2Element = document.getElementById('locationName');

    if (dropdown && h2Element) {
        dropdown.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            h2Element.textContent = selectedOption.text;
        });
    }
}

// Call the function when the page loads
window.addEventListener('load', updateH2FromDropdown);

