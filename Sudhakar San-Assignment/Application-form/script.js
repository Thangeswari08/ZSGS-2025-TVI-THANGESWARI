document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;

  // Basic required validations
  const requiredFields = ["fullName", "email", "phone", "address", "qualification", "university", "yearOfPassing", "resume"];
  for (const field of requiredFields) {
    const input = form.elements[field];
    if (!input || (input.type === "file" ? input.files.length === 0 : input.value.trim() === "")) {
      alert(`Please fill ${field} correctly.`);
      input.focus();
      return;
    }
  }

  if (!form.querySelector('input[type="checkbox"]').checked) {
    alert("You must agree to the declaration.");
    return;
  }

  // Build FormData
  const formData = new FormData(form);
  const values = {};
  formData.forEach((value, key) => {
    if (values[key]) {
      if (Array.isArray(values[key])) {
        values[key].push(value);
      } else {
        values[key] = [values[key], value];
      }
    } else {
      values[key] = value;
    }
  });

  // Show data in new window
  let output = "<h1>Submitted Data</h1><ul style='font-family:Segoe UI;'>";
  for (const key in values) {
    if (values[key] instanceof File) {
      output += `<li><strong>${key}:</strong> ${values[key].name}</li>`;
    } else {
      output += `<li><strong>${key}:</strong> ${values[key]}</li>`;
    }
  }
  output += "</ul>";
  const newWin = window.open("", "_blank");
  newWin.document.write(output);
  newWin.document.close();

  form.reset();
});
