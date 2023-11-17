const inputEleDom = document.querySelector('#ip-tracker-input');
const validationResult = document.querySelector('#validation-result');
const ipInfoContainerDom = document.querySelector('#ip-info');
const mapIframeDom = document.querySelector('#mapIframe');
const mapIframeContainerDom = document.querySelector('#mapIframeCt');
const historyLinkRef = document.querySelector('#history-link');
const historyModalBodyRef = document.querySelector('#history-modal-body');
const submitBtn = document.querySelector('#submit-btn');
const loaderOverlay = document.querySelector('#loader-overlay');

// when clicked on submit button to fetch ip results
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    inputEleDom.value = inputEleDom.value.trim()
    const value = inputEleDom.value;
    inputEleDom.classList.remove('error');
    if (ipRegex.test(value)) {
        fetchIpData(`ipAddress=${value}`, value);
    } else if (domainRegex.test(value)) {
        fetchIpData(`domain=${value}`, value);
    } else {
        validationResult.textContent = "Please enter a valid IP address or domain.";
        inputEleDom.classList.add('error');
    }
})

// when history link is clicked display the history data
historyLinkRef.addEventListener('click', (event) => {
    event.preventDefault();

    historyModalBodyRef.innerHTML = '';

    const historyData = getAllHistoryData();

    if (historyData && historyData.length) {
        historyData.forEach((obj) => {
            const historyLink = document.createElement('a');
            historyLink.classList.add('history-link');
            const [key, value] = Object.entries(obj)[0];
            historyLink.textContent = key;
            historyLink.setAttribute('data-dismiss', 'modal')
            historyLink.addEventListener('click', (event) => {
                inputEleDom.value = key;
                inputEleDom.dispatchEvent(new Event('input'));
                submitBtn.click();
            })
            historyModalBodyRef.appendChild(historyLink);
        })
    }
})

// whenever there is a change in input then clear the results
inputEleDom.addEventListener("input", (event) => {
    inputEleDom.classList.remove('error');

    validationResult.textContent = '';
    ipInfoContainerDom.innerHTML = '';
    ipInfoContainerDom.classList.add('d-none');

    mapIframeContainerDom.classList.add('d-none');
})