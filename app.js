// Select all elements with the class "spending-info" and "number"
const spendingInfo = document.querySelectorAll(".spending-info");
const numbers = document.querySelectorAll(".number");

// Execute the following code after the DOM has fully loaded
window.addEventListener("DOMContentLoaded", fetchData);

// Function to fetch data from the "data.json" file and update the UI
async function fetchData() {
  try {
    // Fetch data from the "data.json" file
    const response = await fetch("./data.json");
    const data = await response.json();

    // Attach click event listeners to each "spending-info" element
    spendingInfo.forEach((info) => {
      const number = info.querySelector(".number");

      info.addEventListener("click", (e) => {
        // Extract the dayId from the clicked "spending-info"
        const dayId = e.currentTarget.dataset.id;

        // Remove the "block" class from all "number" elements
        numbers.forEach((num) => num.classList.remove("block"));

        // Find the selected data based on the dayId
        const selectedData = data.find((item) => item.day === dayId);

        // Update the UI if data is found
        if (selectedData) {
          number.textContent = `$${selectedData.amount.toFixed(2)}`;
          number.classList.add("block");
        }
      });
    });
  } catch (error) {
    // Log an error if there's an issue fetching or parsing the data
    console.error("Error reading JSON file:", error);
  }
}
