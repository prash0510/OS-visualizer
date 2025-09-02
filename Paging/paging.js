function handleSubmit() {
  // Get form inputs
  const memorySize = parseInt(document.getElementById('memorySize').value);
  const pageSize = parseInt(document.getElementById('pageSize').value);
  const numProcesses = parseInt(document.getElementById('numProcesses').value);

  // Clear previous process inputs
  const processInputs = document.getElementById('processInputs');
  processInputs.innerHTML = '';

  // Generate input fields for page numbers for each process
  for (let i = 0; i < numProcesses; i++) {
    const processDiv = document.createElement('div');
    processDiv.innerHTML = `<label for="process${i + 1}Pages">Enter pages for Process ${i + 1} (space-separated):</label>
                            <input type="text" id="process${i + 1}Pages" name="process${i + 1}Pages" required /><br />`;
    processInputs.appendChild(processDiv);
  }

  // Generate form for inputting process number, page number, and offset
  const form = document.createElement('form');
  form.id = 'addressForm';
  form.onsubmit = calculatePhysicalAddress;
  form.innerHTML = `
    <label for="processNumber">Enter process number:</label>
    <input type="number" id="processNumber" name="processNumber" required /><br />
    <label for="pageNumber">Enter page number:</label>
    <input type="number" id="pageNumber" name="pageNumber" required /><br />
    <label for="offset">Enter offset:</label>
    <input type="number" id="offset" name="offset" required /><br />
    <button type="submit">Calculate Physical Address</button>
  `;
  processInputs.appendChild(form);

  // Prevent default form submission
  return false;
}

function calculatePhysicalAddress() {
  const processNo = parseInt(document.getElementById('processNumber').value);
  const pageNo = parseInt(document.getElementById('pageNumber').value);
  const offset = parseInt(document.getElementById('offset').value);

  const processPagesInput = document.getElementById(`process${processNo}Pages`);
  const processPages = processPagesInput.value.split(' ').map(Number);

  // Check if the page number is greater than the maximum page number in the process
  if (pageNo >= processPages.length) {
    alert('Invalid page number!');
    return false;
  }

  // Check for common elements in page arrays of different processes
  const numProcesses = parseInt(document.getElementById('numProcesses').value);
  for (let i = 1; i <= numProcesses; i++) {
    if (i !== processNo) {
      const otherProcessPagesInput = document.getElementById(`process${i}Pages`);
      const otherProcessPages = otherProcessPagesInput.value.split(' ').map(Number);
      const commonPages = processPages.filter(page => otherProcessPages.includes(page));
      if (commonPages.length > 0) {
        alert('Invalid page numbers! One page cannot be allocated to multiple processes.');
        return false;
      }
    }
  }

  const pageSize = parseInt(document.getElementById('pageSize').value);
  

  const page = processPages[pageNo];
  
  // Retrieve the page number using the index
  //const page = processPages[pageIndex];
  
  const physicalAddress = (page * pageSize) + offset;

  const result = document.getElementById('result');
  result.innerHTML = `The physical address is: ${physicalAddress}`;
  result.style.display = 'block';

  // Prevent default form submission
  return false;
}
