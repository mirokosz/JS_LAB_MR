function calculateAndDisplayResults() {

  const value1 = parseFloat(document.getElementById('value1').value) || 0;
  const value2 = parseFloat(document.getElementById('value2').value) || 0;
  const value3 = parseFloat(document.getElementById('value3').value) || 0;
  const value4 = parseFloat(document.getElementById('value4').value) || 0;

  const values = [value1, value2, value3, value4];

  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  document.getElementById('sum').textContent = sum;
  document.getElementById('average').textContent = average;
  document.getElementById('min').textContent = min;
  document.getElementById('max').textContent = max;
}

const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(input => {
  input.addEventListener('input', calculateAndDisplayResults);
});
calculateAndDisplayResults();