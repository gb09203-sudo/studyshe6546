document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("stateSelect");
  const universitySelect = document.getElementById("universitySelect");
  const courseSelect = document.getElementById("courseSelect");
  const semesterSelect = document.getElementById("semesterSelect");
  const subjectSelect = document.getElementById("subjectSelect");
  const showNotesBtn = document.getElementById("showNotesBtn");
  const notesContainer = document.getElementById("notesContainer");

  // Fetch states
  fetch("/api/states/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((state) => {
        const opt = document.createElement("option");
        opt.value = state.id;
        opt.textContent = state.name;
        stateSelect.appendChild(opt);
      });
    });

  stateSelect.addEventListener("change", () => {
    universitySelect.innerHTML = '<option value="">Choose University</option>';
    courseSelect.innerHTML = '<option value="">Choose Course</option>';
    semesterSelect.innerHTML = '<option value="">Choose Semester</option>';
    subjectSelect.innerHTML = '<option value="">Choose Subject</option>';

    if (!stateSelect.value) return;

    fetch(`/api/universities/${stateSelect.value}/`)
      .then((res) => res.json())
      .then((data) => {
        universitySelect.disabled = false;
        data.forEach((uni) => {
          const opt = document.createElement("option");
          opt.value = uni.id;
          opt.textContent = uni.name;
          universitySelect.appendChild(opt);
        });
      });
  });

  universitySelect.addEventListener("change", () => {
    courseSelect.innerHTML = '<option value="">Choose Course</option>';
    semesterSelect.innerHTML = '<option value="">Choose Semester</option>';
    subjectSelect.innerHTML = '<option value="">Choose Subject</option>';

    if (!universitySelect.value) return;

    fetch(`/api/courses/${universitySelect.value}/`)
      .then((res) => res.json())
      .then((data) => {
        courseSelect.disabled = false;
        data.forEach((course) => {
          const opt = document.createElement("option");
          opt.value = course.id;
          opt.textContent = course.name;
          courseSelect.appendChild(opt);
        });
      });
  });

  courseSelect.addEventListener("change", () => {
    semesterSelect.innerHTML = '<option value="">Choose Semester</option>';
    subjectSelect.innerHTML = '<option value="">Choose Subject</option>';

    if (!courseSelect.value) return;

    fetch(`/api/semesters/${courseSelect.value}/`)
      .then((res) => res.json())
      .then((data) => {
        semesterSelect.disabled = false;
        data.forEach((sem) => {
          const opt = document.createElement("option");
          opt.value = sem.id;
          opt.textContent = `Semester ${sem.number}`;
          semesterSelect.appendChild(opt);
        });
      });
  });

  semesterSelect.addEventListener("change", () => {
    subjectSelect.innerHTML = '<option value="">Choose Subject</option>';

    if (!semesterSelect.value) return;

    fetch(`/api/subjects/${courseSelect.value}/${semesterSelect.value}/`)
      .then((res) => res.json())
      .then((data) => {
        subjectSelect.disabled = false;
        data.forEach((sub) => {
          const opt = document.createElement("option");
          opt.value = sub.id;
          opt.textContent = sub.name;
          subjectSelect.appendChild(opt);
        });
      });
  });

  // Fetch Notes
  showNotesBtn.addEventListener("click", () => {
    notesContainer.innerHTML = "";
    if (!subjectSelect.value) return;

    fetch(`/api/get-notes/?subject_id=${subjectSelect.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          notesContainer.innerHTML = "<p>No Notes found.</p>";
          return;
        }
        data.forEach((note) => {
          const card = document.createElement("div");
          card.className =
            "bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center";
          card.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${note.title}</h3>
            <a href="${note.pdf_file}" target="_blank" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">View PDF</a>
          `;
          notesContainer.appendChild(card);
        });
      });
  });
});
