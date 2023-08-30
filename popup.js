document.addEventListener('DOMContentLoaded', function () {
    const findHolidaysButton = document.getElementById('findHolidaysButton');
    const dateInput = document.getElementById('dateInput');
    const countrySelect = document.getElementById('countrySelect');
    const holidaysList = document.getElementById('holidaysList');
  
    findHolidaysButton.addEventListener('click', function () {
      const selectedDate = dateInput.value;
      const selectedCountry = countrySelect.value;
  
      if (selectedDate && selectedCountry) {
        const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=Dz679lIk8qzz8iPYui7jzSEwAASaK3nS&country=${selectedCountry}&year=${selectedDate.slice(0, 4)}&date=${selectedDate}`;
  
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const holidays = data.response.holidays;
            holidaysList.innerHTML = '';
  
            // Find holidays on the selected date
            const holidaysOnSelectedDate = holidays.filter(holiday => holiday.date.iso === selectedDate);
            if (holidaysOnSelectedDate.length > 0) {
              holidaysList.innerHTML = `<p>Holidays on ${selectedDate} in ${selectedCountry}:</p>`;
              holidaysOnSelectedDate.forEach(holiday => {
                holidaysList.innerHTML += `<p>${holiday.name}</p>`;
              });
            } else {
              holidaysList.innerHTML = `No holidays found on ${selectedDate} in ${selectedCountry}.`;
            }
          })
          .catch(error => {
            holidaysList.innerHTML = 'Error fetching holidays.';
            console.error(error);
          });
      }
    });
  });