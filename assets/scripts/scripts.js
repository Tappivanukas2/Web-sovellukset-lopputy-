
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 6000);
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
            case 'Vuolajohka':
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

    startImageRotation();

    const observer = new MutationObserver(() => {
        currentIndex = 0;
        startImageRotation();
    });

    observer.observe(h2Element, { childList: true, characterData: true, subtree: true });
}

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

window.addEventListener('load', updateH2FromDropdown);

function updateMapBasedOnDropdown() {
    const dropdown = document.getElementById('locationDropdown');
    const mapContainer = document.querySelector('.map-container');

    if (dropdown && mapContainer) {
        dropdown.addEventListener('change', function() {
            const selectedLocation = this.value;
            let mapSrc = '';

            switch (selectedLocation) {
                case 'Kaitsajoki':
                    mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.9201631046915!2d28.45583!3d69.44583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45cb49c8a2af65b9%3A0x9b46049f3f7c81c4!2sKaitsajoki!5e0!3m2!1sen!2sus!4v1683737000000!5m2!1sen!2sus';
                    break;
                case 'Sandfjordelva':
                    mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.9201631046915!2d28.15583!3d69.64583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45cb49c8a2af65b9%3A0x9b46049f3f7c81c4!2sSandfjordelva!5e0!3m2!1sen!2sus!4v1683737000000!5m2!1sen!2sus';
                    break;
                case 'Vuolajohka':
                    mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.9201631046915!2d28.25583!3d69.54583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45cb49c8a2af65b9%3A0x9b46049f3f7c81c4!2sVuolajohka!5e0!3m2!1sen!2sus!4v1683737000000!5m2!1sen!2sus';
                    break;
                case 'Valtijoki':
                    mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.9201631046915!2d28.35583!3d69.34583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45cb49c8a2af65b9%3A0x9b46049f3f7c81c4!2sValtijoki!5e0!3m2!1sen!2sus!4v1683737000000!5m2!1sen!2sus';
                    break;
                default:
                    mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.9201631046915!2d28.45583!3d69.44583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45cb49c8a2af65b9%3A0x9b46049f3f7c81c4!2sKaitsajoki!5e0!3m2!1sen!2sus!4v1683737000000!5m2!1sen!2sus';
            }

            const iframe = mapContainer.querySelector('iframe');
            if (iframe) {
                iframe.src = mapSrc;
            } else {
                const newIframe = document.createElement('iframe');
                newIframe.src = mapSrc;
                newIframe.allowFullscreen = true;
                newIframe.loading = 'lazy';
                newIframe.referrerPolicy = 'no-referrer-when-downgrade';
                mapContainer.appendChild(newIframe);
            }
        });
    }
}

// Call the function when the page loads
window.addEventListener('load', updateMapBasedOnDropdown);

function fetchFishData() {
    fetch('assets/data/kalat.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const fishData = rows.slice(1).map(row => {
                const values = row.split(',');
                return headers.reduce((obj, header, index) => {
                    obj[header.trim()] = values[index].trim();
                    return obj;
                }, {});
            });
            console.log(fishData);
        })
        .catch(error => console.error('Error fetching fish data:', error));
}

window.addEventListener('load', fetchFishData);

function updateVideoContainer() {
    const dropdown = document.getElementById('locationDropdown');
    const videoContainer = document.getElementById('videoContainer');

    dropdown.addEventListener('change', function() {
        if (this.value === 'Sandfjordelva') {
            videoContainer.style.display = 'block';
        } else {
            videoContainer.style.display = 'none';
        }
    });
}

window.addEventListener('load', updateVideoContainer);
