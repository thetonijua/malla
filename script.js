document.addEventListener("DOMContentLoaded", function () {
  fetch("courses.json")
    .then(response => response.json())
    .then(data => {
      const maxSemestre = Math.max(...data.map(curso => curso.semestre));
      const años = Math.ceil(maxSemestre / 2);

      const grid = document.getElementById("malla");
      grid.innerHTML = ""; // Limpia antes de dibujar

      // Flex horizontal (ya está en CSS, pero aquí por si acaso)
      grid.style.display = "flex";
      grid.style.gap = "1.5rem";
      grid.style.overflowX = "auto";

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
            ramoDiv.innerHTML = `
              <span class="ramo-nombre">${curso.nombre}</span>
              <span class="ramo-credito">${curso.creditos} créditos</span>
              <span class="ramo-codigo">${curso.codigo}</span>
            `;
            ramoDiv.addEventListener("click", () => {
              ramoDiv.classList.toggle("tachado");
            });
            semestreDiv.appendChild(ramoDiv);
          });

          añoDiv.appendChild(semestreDiv);
        }

        grid.appendChild(añoDiv);
      }

      // Buscador
      document.getElementById("q").addEventListener("input", function () {
        const texto = this.value.toLowerCase();
        document.querySelectorAll('.ramo').forEach(div => {
          const visible = div.textContent.toLowerCase().includes(texto);
          div.style.display = visible ? "block" : "none";
        });
      });
    })
    .catch(e => {
      document.getElementById("malla").innerHTML = "<p class='text-danger'>No se pudo cargar el archivo courses.json</p>";
    });
});
