function getStoredHistoryData(inputValue) {
    let historyData = localStorage.getItem(localKeyForHistory);
    if (historyData) {
        // converted to array form of data
        historyData = JSON.parse(historyData);
        const objectFound = historyData.find((obj) => obj[inputValue]);

        return objectFound;
    }
}

function getAllHistoryData() {
    let historyData = localStorage.getItem(localKeyForHistory);
    if (historyData) {
        return JSON.parse(historyData);
    }
}

function storeHistoryData(inputValue, dataToStore) {
    let historyData = localStorage.getItem(localKeyForHistory);
    const objectToStore = {
        [inputValue]: dataToStore
    }
    if (!historyData) {
        historyData = JSON.stringify([]);
    }

    // converted to array form of data
    historyData = JSON.parse(historyData);
    historyData.push(objectToStore);

    localStorage.setItem(localKeyForHistory, JSON.stringify(historyData));
}

function renderIpInfo(data) {
    ipInfoContainerDom.classList.remove('d-none');
    // Clear previous content
    ipInfoContainerDom.innerHTML = '';

    for (const key in data) {
        const divEleCt = document.createElement('div');

        const divEleOne = document.createElement('div');
        const divEleTwo = document.createElement('div');

        divEleOne.textContent = key;
        divEleTwo.textContent = data[key];

        divEleOne.classList.add('data-head');
        divEleTwo.classList.add('data-item');

        divEleCt.appendChild(divEleOne)
        divEleCt.appendChild(divEleTwo)

        ipInfoContainerDom.appendChild(divEleCt);
    }
}

function renderMap(latLng) {
    // Construct the map URL with the received coordinates
    const mapUrl = `https://maps.google.com/maps?q=${latLng.latitude},${latLng.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    // Set the src attribute of the iframe
    mapIframeDom.src = mapUrl;
    mapIframeContainerDom.classList.remove('d-none');
}

function showToast(text, className) {
    // Get the toast container
    let toastContainer = document.getElementById('toaster-container');
    let toastHeading = document.getElementById('toaster-heading');
    let toastMessage = document.getElementById('toaster-message');

    toastHeading.textContent = 'Error';
    toastMessage.textContent = text;

    // Display the toast
    toastContainer.style.opacity = '1';

    // Hide the toast after a delay (e.g., 3 seconds)
    setTimeout(function () {
        toastContainer.style.opacity = '0';
    }, 3000);
}


async function fetchIpData(queryParams, inputValue) {
    const object = getStoredHistoryData(inputValue);
    if (object) {
        renderIpInfo(object[inputValue].requiredData);
        renderMap(object[inputValue].latLng);
        return;
    }

    try {
        loaderOverlay.classList.remove('d-none');
        const response = await fetch(geoIpBaseUrl + queryParams);
        loaderOverlay.classList.add('d-none');
        if (!response.ok) {
            throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data:', data);
        const requiredData = {
            'IP Address': data.ip,
            'Country': data.location.country,
            'Region': data.location.region,
            'City': data.location.city,
            'ISP': data.isp
        }
        const latLng = {
            latitude: data.location.lat,
            longitude: data.location.lng
        }
        renderIpInfo(requiredData);
        renderMap(latLng);
        storeHistoryData(inputValue, { requiredData, latLng });

        // let historyData = localStorage.getItem('history');
        // const objToStore = { requiredData, latLng, inputValue };
        // if (historyData) {
        //     historyData = JSON.parse(historyData);
        //     historyData.push(objToStore);
        //     localStorage.setItem('history', JSON.stringify([objToStore]));
        // } else {
        //     localStorage.setItem('history', JSON.stringify([objToStore]));
        // }
    } catch (error) {
        console.error('Error:', error);
        if (error.message) {
            showToast(error.message, 'error');
        } else {
            showToast("Something Went Wrong!", 'error');
        }
    }
}