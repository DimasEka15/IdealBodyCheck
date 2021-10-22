const mainContainer = document.querySelector("main");
const form = updateUiForm();

// gendre
function gendreIdeal(tinggiBadan) {
  if (document.getElementById("laki").checked) {
    const idealUserMan = countIdealMan(tinggiBadan);
    return idealUserMan;
  }
  if (document.getElementById("perempuan").checked) {
    const idealUserWoman = countIdealWoman(tinggiBadan);
    return idealUserWoman;
  }
}

// perhitungan Ideal Laki
function countIdealMan(tinggiBadan) {
  const weightIdealMan = Math.floor(
    tinggiBadan.value - 100 - ((tinggiBadan.value - 100) * 10) / 100
  );
  return weightIdealMan;
}

// perhitungan Ideal Perempuan
function countIdealWoman(tinggiBadan) {
  const weightIdealWoman = Math.floor(
    tinggiBadan.value - 100 - ((tinggiBadan.value - 100) * 15) / 100
  );
  return weightIdealWoman;
}

// membandingkan dengan berat badan user
function conparingWithUser(uName, beratBadan, tinggiBadan, idealCount) {
  if (beratBadan.value == idealCount) {
    updateUiAlertSucces(uName, beratBadan, tinggiBadan);
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("button-alert")) {
        updateUiForm();
      }
    });
  }
  if (beratBadan.value != idealCount) {
    updateUiAlertFail(uName, idealCount);
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("button-alert")) {
        updateUiForm();
      }
    });
  }
}

// submit form
function submitForm(buttonForm) {
  buttonForm.addEventListener("click", function () {
    let uName = document.querySelector("input#nama");
    let beratBadan = document.querySelector("input#berat");
    let tinggiBadan = document.querySelector("input#tinggi");
    let idealCount = gendreIdeal(tinggiBadan);
    // console.log(idealCount);
    conparingWithUser(uName, beratBadan, tinggiBadan, idealCount);
  });
}

// update ui form
function updateUiForm() {
  mainContainer.innerHTML = printForm();
  const buttonForm = document.querySelector("form button");
  submitForm(buttonForm);
}

function printForm() {
  return `
          <form>
          <div class="nama">
            <label for="nama">Nama</label>
            <input type="text" id="nama" name="nama" />
          </div>
          <div class="jenis-kelamin">
            <div class="jk-laki" >
              <input
                type="radio"
                id="laki"
                name="jenis-kelamin"
                value="Laki-laki"
              />
              <label for="laki">Laki-laki</label>
            </div>
            <input
              type="radio"
              id="perempuan"
              name="jenis-kelamin"
              value="Perempuan"
            />
            <label for="perempuan">Perempuan</label>
          </div>
          <div class="berat-badan">
            <label for="berat">Berat Badan</label>
            <input type="number" id="berat" name="berat" />
          </div>
          <div class="tinggi-badan">
            <label for="tinggi">Tinggi Badan</label>
            <input type="number" id="tinggi" name="tinggi" />
          </div>
          <button type="button">Periksa</button>
        </form>
  `;
}

// update ui alert success
function updateUiAlertSucces(uName, beratBadan, tinggiBadan) {
  mainContainer.innerHTML = printAlertSuccess(uName, beratBadan, tinggiBadan);
}

function printAlertSuccess(uName, beratBadan, tinggiBadan) {
  return `
    <div class="alert alert-success">
      <h1>SELAMAT</h1>
      <p>Halo ${uName.value} Dengan berat badan ${beratBadan.value} dan tinggi ${tinggiBadan.value}. Berat badanmu sudah ideal</p>
      <button class="button-alert" type="button">Kembali</button>
    </div>
  `;
}

function updateUiAlertFail(uName, idealCount) {
  mainContainer.innerHTML = printAlertFail(uName, idealCount);
}

function printAlertFail(uName, idealCount) {
  return `
    <div class="alert alert-fail">
      <h1>Maaf..</h1>
      <p>
        Halo ${uName.value}. Berat badanmu belum ideal, berat badan yang ideal yaitu ${idealCount} kg.
        Tetap semangat!
      </p>
      <button class="button-alert" type="button">Kembali</button>
    </div>
  `;
}
