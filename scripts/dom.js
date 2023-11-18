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
    let value = inputEleDom.value;
    inputEleDom.classList.remove('error');
    if (ipRegex.test(value)) {
        fetchIpData(`ipAddress=${value}`, value);
    } else if (domainRegex.test(value)) {
        value = value.replace(/^https?:\/\//, '');
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
            const cardCt = document.createElement('div');
            cardCt.classList.add('card');

            const cardContent = document.createElement('div');
            cardCt.classList.add('card-content');

            cardCt.appendChild(cardContent);

            const cardDesc = document.createElement('div');
            cardCt.classList.add('card-description');

            cardContent.appendChild(cardDesc);

            const historyLink = document.createElement('a');
            historyLink.classList.add('card-link');
            cardContent.appendChild(historyLink);

            const [key, value] = Object.entries(obj)[0];
            cardDesc.textContent = key;
            historyLink.textContent = 'Get Current IP details';
            historyLink.setAttribute('data-dismiss', 'modal')
            historyLink.addEventListener('click', (event) => {
                inputEleDom.value = key;
                inputEleDom.dispatchEvent(new Event('input'));
                submitBtn.click();
            })
            historyModalBodyRef.appendChild(cardCt);
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