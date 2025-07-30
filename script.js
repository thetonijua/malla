document.addEventListener("DOMContentLoaded", function () {
  fetch("courses.json")
    .then(response => response.json())
    .then(data => {
      // Detecta años y semestres máximos automáticamente
      const maxSemestre = Math.max(...data.map(curso => curso.semestre));
      const años = Math.ceil(maxSemestre / 2);

      const grid = document.createElement("div");
      grid.style.display = "flex";
      grid.style.gap = "1.5rem";
      grid.style.overflowX = "auto";
      grid.style.marginTop = "1.5rem";

      for (let año = 1; año <= años; año++) {
        const añoDiv = document.createElement("div");
        añoDiv.className = "año-container";
        añoDiv.innerHTML = `<h3>Año ${año}</h3>`;

        for (let sem = 1; sem <= 2; sem++) {
          const semestre = (año - 1) * 2 + sem;
          const semestreDiv = document.createElement("div");
          semestreDiv.className = "semestre";
          semestreDiv.innerHTML = `<h5>Semestre ${semestre}</h5>`;

          const cursos = data.filter(c => c.semestre === semestre);

          cursos.forEach(curso => {
            const ramoDiv = document.createElement("div");
            ramoDiv.className = "ramo";
            ramoDiv.textContent = `${curso.nombre}\n${curso.codigo} | ${curso.creditos} cr`;
            ramoDiv.addEventListener("click", () => {
              ramoDiv.classList.toggle("tachado");
            });
            semestreDiv.appendChild(ramoDiv);
          });

          añoDiv.appendChild(semestreDiv);
        }

        grid.appendChild(añoDiv);
      }

      // Quita la tabla si existe y agrega el grid horizontal
      const tabla = document.getElementById("malla");
      if (tabla) tabla.remove();
      document.querySelector(".table-container").appendChild(grid);

      // Buscador
      document.getElementById("q").addEventListener("input", function () {
        const texto = this.value.toLowerCase();
        document.querySelectorAll('.ramo').forEach(div => {
          div.style.display = div.textContent.toLowerCase().includes(texto) ? "block" : "none";
        });
      });
    });
});
