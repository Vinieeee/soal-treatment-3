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

            const editIndex = document.getElementById("editIndex").value;

            if (editIndex === "") {

                data.push(pasien);

            } else {

                pasien.antrian = data[editIndex].antrian;

                data[editIndex] = pasien;

                localStorage.removeItem("editIndex");

            }

            localStorage.setItem("pasien", JSON.stringify(data));

            alert("Data berhasil disimpan!");
            form.reset();
            window.location.href = "index.html";
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
                <td>
                    <button class="edit" onclick="editData(${index})">Edit</button>
                    <button class="hapus" onclick="hapusData(${index})">Hapus</button>
                </td>
            </tr>
        `;

    });

}

function editData(index) {

    localStorage.setItem("editIndex", index);

    window.location.href = "dataantrian.html";

}

function hapusData(index) {

    let data = JSON.parse(localStorage.getItem("pasien")) || [];

    if (confirm("Yakin ingin menghapus data ini?")) {

        data.splice(index, 1);

        localStorage.setItem("pasien", JSON.stringify(data));

        tampilkanData();

    }

}

const editIndex = localStorage.getItem("editIndex");

if (editIndex !== null) {

    let data = JSON.parse(localStorage.getItem("pasien")) || [];

    document.getElementById("nama").value = data[editIndex].nama;
    document.getElementById("jk").value = data[editIndex].jk;
    document.getElementById("keluhan").value = data[editIndex].keluhan;

    document.getElementById("editIndex").value = editIndex;

}