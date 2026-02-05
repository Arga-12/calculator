const keys = document.querySelectorAll(".keyCalc");
const print = document.getElementById("print");

keys.forEach(tombol => {
    tombol.addEventListener('click', () => {
        const isiKey = tombol.textContent.trim();
        
        if (isiKey === "AC") {
            print.value = "0";
        } else if (isiKey === "Hapus") { 
            print.value = print.value.slice(0, -1);
        }
        else if (isiKey === "Hitung!") { 
            try {
                let input = print.value;
                let rumus = input.replace(/×/g, '*').replace(/÷/g, '/');
                rumus = rumus.replace(/[^0-9+\-*/.()]/g, '');

                if(rumus === '') {
                    print.value = "0";
                } else {
                    let hasil = eval(rumus);
                    History(input, hasil);
                    print.value = hasil;
                }
            } catch (e) {
                print.value = "WEIIIII";
                console.error(e);
            };
        } else { 
            const op = ['+', '-', '÷', '×', '.'];
            let lastOp = print.value.slice(-1);
            let allKeys = isiKey;

            const spamKeys = op.includes(lastOp) && op.includes(allKeys);

            if (spamKeys) {
                print.value = print.value.slice(0, -1) + isiKey;
            } else if (print.value === "0") {
                print.value = isiKey;
            } else {
                print.value += isiKey;
            };
        };
    })
});

//history func
function History(rumus, hasil) {
    let LiHistory = JSON.parse(localStorage.getItem("history")) || [];
    
    const data = {
        ekspresi: rumus,
        hasil: hasil,
        date: new Date().toLocaleString()
    };

     LiHistory.unshift(data);
     LiHistory = LiHistory.slice(0, 10);
     localStorage.setItem("history", JSON.stringify(LiHistory));

     console.log("Histori dibuat:", LiHistory);
     renderHistory();
};

function renderHistory() {
    const historyList = document.getElementById("historyList");
    const LiHistory = JSON.parse(localStorage.getItem("history")) || [];

    if (LiHistory.length === 0) {
        historyList.innerHTML = "<p class='text-center text-gray-500'>Tidak ada history</p>";
        return;
    };

    historyList.innerHTML = LiHistory.map((item, index) => `
        <div class="flex items-center justify-between p-2 border-b border-gray-200">
            <p>${index + 1}. ${item.ekspresi} = ${item.hasil}</p>
            <p class="text-gray-500 text-sm">${item.date}</p>
        </div>
    `).join('');
};

function tampilHistory(rumus) {
    print.value = rumus;
};
// tombol.addEventListener('click', () => {
//     const a1 = Number(bil_1.value);
//     const a2 = Number(bil_2.value);
//     const o = op.value;

//     if (o == "tambah") {
//         hasil = a1 + a2;
//     } else if (o == "kurang") {
//         hasil = a1 - a2;
//     } else if (o == "kali") {
//         hasil = a1 * a2;
//     } else if (o == "bagi") {
//         hasil = a1 / a2;
//     } else if (o == "mod") {
//         hasil = a1 % a2;
//     } else {
//         print.textContent = `No numbers to operate rnow`;
//     };

//     print.textContent = `hasil:${hasil}`;
// });

// WEIIII
const h = document.querySelectorAll(".wei");
const wei = new Audio('uma/wei.mp3')
wei.volume = 0.3
wei.loop = true;

const kagi = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

Object.defineProperty(print, 'value', {
    get: function () {
        return kagi.get.call(this)
    },
    set: function (w) { 
        kagi.set.call(this, w)
        if (w === "WEIIIII") {
            wei.play();
            h[0].classList.remove('hidden');
            h[1].classList.remove('hidden');
        } else {
            wei.pause();
            h[0].classList.add('hidden');
            h[1].classList.add('hidden');
        }
    },
    configurable: true,
    enumerable: true
})