const zoznamhtml = document.querySelector("#zoznam");
const inputHladaj = document.querySelector("#hladaj");

function prekresliVsetko() {
    const zoznam = aktivneKrajiny();
    vykresli(zoznam);
    prepocitajSuhrn(zoznam);
}

function vykresli(zoznam) {
    zoznamhtml.innerHTML = "";
    if (zoznam.length === 0) {
        const chyba = document.createElement("p");
        chyba.textContent = "Nič sa nenašlo.";
        zoznamhtml.appendChild(chyba);
    }
    else {
        zoznam.forEach(prvok => {
            const polozka = document.createElement("li");
            polozka.textContent = `${prvok.nazov} — ${prvok.kontinent} — ${prvok.emisie} t CO₂/os.`;
            zoznamhtml.appendChild(polozka);
        });
    }
}

let vybranyKontinent = "vsetky";

function aktivneKrajiny() {
    const inputKrajina = inputHladaj.value;
    const zoznamKrajin = krajiny.filter(k => vybranyKontinent === "vsetky" || k.kontinent === vybranyKontinent);
    const vysledok = zoznamKrajin.filter(k => k.nazov.toLowerCase().includes(inputKrajina.toLowerCase()));
    return vysledok;
}
const suhrnHtml = document.querySelector("#suhrn");

function prepocitajSuhrn(zoznam) {
    const pocet = zoznam.length;
    if (pocet === 0) {
        suhrnHtml.textContent = "Žiadne krajiny na zobrazenie.";
        return;
    }
    const sucetEmisii = zoznam.reduce((acc, k) => acc + k.emisie, 0);
    const priemer = (sucetEmisii / pocet).toFixed(1);
    suhrnHtml.textContent = `${pocet} krajín · priemer ${priemer} t/os.`;
}

inputHladaj.addEventListener("input", () => {
    prekresliVsetko();
})


const filtre = document.querySelectorAll(".kontinent");

filtre.forEach((filter) => {
    filter.addEventListener("click", () => {
        vybranyKontinent = filter.dataset.kontinent;
        filtre.forEach((f) => f.classList.remove("vybrane"));
        filter.classList.add("vybrane");
        prekresliVsetko();
    });
});

prekresliVsetko();