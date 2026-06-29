// ======================
// Halaman Form
// ======================
const form = document.getElementById("formPasien");

if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        try {

            const nama = document.getElementById("nama").value.trim();
            const jk = document.getElementById("jk").value;
            const keluhan = document.getElementById("keluhan").value.trim();

            if (nama === "") {
                throw new Error("Nama pasien wajib diisi!");
            }

            if (jk === "") {
                throw new Error("Jenis kelamin wajib dipilih!");
            }

            if (keluhan === "") {
                throw new Error("Keluhan wajib diisi!");
            }

            let data = JSON.parse(localStorage.getItem("pasien")) || [];

            let nomorAntrian = "A" + String(data.length + 1).padStart(3, "0");

            const pasien = {
                antrian: nomorAntrian,
                nama,
                jk,
                keluhan
            };

            data.push(pasien);

            localStorage.setItem("pasien", JSON.stringify(data));

            alert("Data berhasil disimpan!");

            form.reset();

        } catch (error) {
            alert(error.message);
        }
    });

}
// ======================
// Halaman Data
// ======================

const tbody = document.getElementById("tableData");

if (tbody) {

    tampilkanData();

}

function tampilkanData() {

    const tbody = document.getElementById("tableData");
    tbody.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("pasien")) || [];

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="kosong">
                    Belum ada pasien yang mengantri.
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((pasien, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${pasien.antrian}</td>
                <td>${pasien.nama}</td>
                <td>${pasien.jk}</td>
                <td>${pasien.keluhan}</td>
            </tr>
        `;

    });

}
