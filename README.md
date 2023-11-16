# IP Address Tracker

## Overview
- The IP Address Tracker is a web application that allows users to track the location and information associated with a given IP address or domain name. The application uses an open-source IP geolocation API to fetch and display details such as the location, region, country, and ISP.

## User Interface
### Design:
- The user interface has been meticulously designed for clarity and simplicity, ensuring a seamless user experience and Responsive.
- The layout prioritizes a clean look, promoting easy navigation for users of varying technical backgrounds.
### Input Field:

- A prominently featured input field allows users to enter either an IP address or domain name, catering to different user preferences.
- The input field incorporates proper validation to handle various input scenarios.
### Track IP Button:

- The "Track IP" button triggers the initiation of the IP address lookup process.
- It is strategically placed to be easily accessible to users after entering the IP address or domain.
Information Display:

- Upon successful IP address lookup, the application displays comprehensive information about the tracked IP address, including location, region, country, and ISP.
- The displayed information is presented in a clear and organized manner, enhancing user comprehension.

## Functionality
### IP Geolocation API Integration:

- JavaScript is employed to interact with the chosen open-source IP geolocation API, ensuring accurate and up-to-date information retrieval.
- The application seamlessly integrates with APIs like "ipinfo.io" or "ip-api.com" to fetch the required data.
### Data Presentation:

- Fetched information is dynamically presented on the user interface, providing a real-time view of the tracked IP address details.
- The application ensures a smooth and responsive display, enhancing user satisfaction.
### Error Handling:

- Robust error-handling mechanisms are implemented to gracefully manage scenarios where the entered IP address is not found or when the API request fails.
- Clear and user-friendly feedback is provided in such cases, guiding users on how to proceed.

### Map Display:
- For enhanced user engagement, an optional feature includes a map displaying the approximate location of the tracked IP address.

### History Feature:
- Users can conveniently access and review their tracking history from the header, providing a useful functionality for reference.
- on click of any history user can view corresponing ip without making extra API call as we are storing data locally 

### Demo Link
- https://manchikantisaikiran.github.io/IP-Address-Tracker/

## Output
![Output](./output/Screenshot%201.png)
![Output](./output/Screenshot%202.png)
![Output](./output/Screenshot%203.png)
![Output](./output/Screenshot%204.png)
![Output](./output/Screenshot%205.png)

#### Design Reference 
- https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0