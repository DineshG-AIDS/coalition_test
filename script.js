document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const dataContainer = document.getElementById("data-container");
  const apiUrl = "https://fedskillstest.coalitiontechnologies.workers.dev";
  const username = "coalition";//We can also use ENV 
  const password = "skills-test";
  const credentials = btoa(`${username}:${password}`);
  const headers = new Headers({
    Authorization: `Basic ${credentials}`,
  });

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    const iconOpen = menuButton.querySelector("svg:nth-child(1)");
    const iconClose = menuButton.querySelector("svg:nth-child(2)");
    if (mobileMenu.classList.contains("hidden")) {
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    } else {
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
    }
  });

  async function fetchData() {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      renderData(data.slice(0, 20));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function renderData(data) {
    dataContainer.innerHTML = "";
    let selectedDiv = null;

    data.forEach((item, index) => {
      const div = document.createElement("div");
      div.className =
        "flex flex-row items-center justify-around cursor-pointer p-4 rounded-xl";
      div.dataset.index = index;
      const img = document.createElement("img");
      img.src = item.profile_picture || "./asserts/Layer 8.png";
      img.alt = "";
      img.className = "w-12";

      const nameDiv = document.createElement("div");
      const name = document.createElement("h1");
      name.className = "text-[#072635] cursor-pointer";
      name.textContent = item.name || "Unknown Name";

      const details = document.createElement("h1");
      details.className = "text-[#707070] text-xs";
      details.textContent =
        `${item.gender} ${item.age}` || "Details not available";

      nameDiv.appendChild(name);
      nameDiv.appendChild(details);

      const moreIconDiv = document.createElement("div");
      const moreIcon = document.createElement("img");
      moreIcon.src = "./asserts/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";
      moreIcon.alt = "";
      moreIcon.className = "transform translate-x-full ";
      moreIconDiv.appendChild(moreIcon);

      div.appendChild(img);
      div.appendChild(nameDiv);
      div.appendChild(moreIconDiv);

      div.addEventListener("click", () => {
        if (selectedDiv) {
          selectedDiv.classList.remove("bg-[#D8FCF7]");
        }
        console.log(item);
        ToRenderLabTestTable(item?.lab_results);
        ToRenderTable(item?.diagnostic_list);

        DataForHighlightValue(item);

        div.classList.add("bg-[#D8FCF7]");
        selectedDiv = div;

        initializeChart(item);
      });

      dataContainer.appendChild(div);

      if (index === 3) {
        div.classList.add("bg-[#D8FCF7]");
        selectedDiv = div;
        initializeChart(item);
        ToRenderTable(item?.diagnostic_list);
        ToRenderLabTestTable(item?.lab_results);
      }
    });
  }

  let myChart = null;
  function DataForHighlightValue(data) {
    const ValueForRespiratoryRate =
      data?.diagnosis_history[0]?.respiratory_rate?.value;
    const ValueForRespiratoryLevel =
      data?.diagnosis_history[0]?.respiratory_rate?.levels;
    const ValueForTemperature = data?.diagnosis_history[0]?.temperature?.value;
    const ValueForTemperatureLevel =
      data?.diagnosis_history[0]?.temperature?.levels;
    const ValueForHeartRate = data?.diagnosis_history[0]?.heart_rate?.value;
    const ValueForHeartRateLevel =
      data?.diagnosis_history[0]?.heart_rate?.levels;
    const ValueForSystolic =
      data?.diagnosis_history[0]?.blood_pressure?.systolic?.value;
    const ValueForDiastolic =
      data?.diagnosis_history[0]?.blood_pressure?.diastolic?.value;

    document.getElementById("SystolicValue").textContent = ValueForSystolic;
    document.getElementById("ImageUserDetails").src = data?.profile_picture;
    document.getElementById("DiastolicValue").textContent = ValueForDiastolic;
    document.getElementById(
      "respiratory_rate"
    ).textContent = `${ValueForRespiratoryRate} bpm`;
    document.getElementById("respiratory_level").textContent =
      ValueForRespiratoryLevel;
    document.getElementById(
      "TemperatureValue"
    ).textContent = `${ValueForTemperature}°F`;
    document.getElementById("TemperatureLevel").textContent =
      ValueForTemperatureLevel;
    document.getElementById(
      "HeartValue"
    ).textContent = `${ValueForHeartRate} bpm`;
    document.getElementById("HeartLevel").textContent = ValueForHeartRateLevel;
    document.getElementById("DateForUserTab").textContent = data?.date_of_birth;
    document.getElementById("GenderForUserTab").textContent = data?.gender;
    document.getElementById("PhoneForUserTab").textContent = data?.phone_number;
    document.getElementById("EmergencyPhoneForUserTab").textContent =
      data?.emergency_contact;
    document.getElementById("InsuranceForUserTab").textContent =
      data?.insurance_type;
  }
  function ToRenderLabTestTable(labResults) {
    document.getElementById("OverAllDiv").className =
      "flex flex-row items-center justify-between p-5";
    const container = document.getElementById("lab-results-container");
    labResults.forEach((result) => {
      const resultContainer = document.createElement("div");
      resultContainer.className =
        "flex flex-row items-center justify-between p-5";

      const resultText = document.createElement("h1");
      resultText.className = "text-[#072635] text-[13px]";
      resultText.textContent = result;

      const resultImage = document.createElement("img");
      resultImage.src = "./asserts/download_FILL0_wght300_GRAD0_opsz24 (1).svg";
      resultImage.alt = "Download Image";
      resultImage.className = "pl-32";

      resultContainer.appendChild(resultText);
      resultContainer.appendChild(resultImage);

      container.appendChild(resultContainer);
    });
  }
  function ToRenderTable(diagnosticList) {
    const tableBody = document.getElementById("diagnostic-table-body");
    diagnosticList.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "bg-white  rounded-full text-xs";
      document.getElementById("TableRow").className =
        "text-xs bg-[#F6F7F8] border rounded-full";

      const nameCell = document.createElement("th");
      nameCell.scope = "row";
      nameCell.className = "px-6 py-4 font-medium text-xs text-gray-900 ";
      nameCell.textContent = item.name;

      const descriptionCell = document.createElement("td");
      descriptionCell.className = "px-6 py-4";
      descriptionCell.textContent = item.description;

      const statusCell = document.createElement("td");
      statusCell.className = "px-6 py-4";
      statusCell.textContent = item.status;

      row.appendChild(nameCell);
      row.appendChild(descriptionCell);
      row.appendChild(statusCell);

      tableBody.appendChild(row);
    });
  }
  function initializeChart(datafromapi) {
    const XValue = datafromapi?.diagnosis_history.map(
      (i) => `${i.month} ${i.year}`
    );
    const dataOnChart = datafromapi?.diagnosis_history.map(
      (i) => i.blood_pressure
    );

    const systolicValues = dataOnChart.map((i) => i.systolic.value);
    const diastolicValues = dataOnChart.map((i) => i.diastolic.value);

    if (myChart) {
      myChart.data.labels = XValue.slice(0, 6);
      myChart.data.datasets[0].data = systolicValues;
      myChart.data.datasets[1].data = diastolicValues;
      myChart.update();
    } else {
      const ctx = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: XValue.slice(0, 6),
          datasets: [
            {
              label: "Systolic",
              data: systolicValues,
              borderColor: "#C26EB4",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 2,
              fill: false,
              pointBackgroundColor: "#E66FD2",
              pointBorderColor: "#fff",
              pointRadius: 5,
              tension: 0.4,
            },
            {
              label: "Diastolic",
              data: diastolicValues,
              borderColor: "#7E6CAB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderWidth: 2,
              fill: false,
              pointBackgroundColor: "#8C6FE6",
              pointBorderColor: "#fff",
              pointRadius: 5,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: { display: true },
              grid: { display: false },
            },
            y: {
              display: true,
              beginAtZero: false,
              title: { display: true, text: "Value" },
              ticks: { stepSize: 20 },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    }
  }

  fetchData();
});
