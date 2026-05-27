const packages={
  "3hrs":{hours:3,price:500,label: "3hours"},
  "5hrs":{hours:5,price:800,label: "5hours"},
  "24hrs":{hours:24,price:1000,label: "24hours"},
  "28hrs":{hours:28,price:1500,label: "28hours"},
  "72hrs":{hours:72,price:3000,label: "72hours"},
  "1wk":{hours:168,price:6000,label: "weekly"},
  "1m":{hours:720,price:25000,label: "monthly"}
};


function buy(packageId){
  const pkg = packages[packageId];
  if(!pkg) return;

  //generate voucher
  const voucher = 'wifi-' + Math.random().toString(36).substr(2,6).toUpperCase();
  const expiry = new Date();
  expiry.setHours(expiry.getHours()+pkg.hours);

  //save purchase to localstorage
  let purchases = JSON.parse(localStorage.getItem('wifipurchase')) || [];
  const purchase = {
    package: packageId,
    hours: pkg.hours,
    price: pkg.price,
    label: pkg.label,
    voucher: voucher,
    purchasedAt: new Date().toLocaleString(),
    expiresAt: expiry.toLocaleString(),
    used: false
  };
  purchases.push(purchase);
  localStorage.setItem('wifipurchase',JSON.stringify(purchases));

  //showing voucher
  alert(`package: ${pkg.label}\n price: ${pkg.price} UGX\n voucher: ${voucher}\n valid until: ${expiry.toLocaleString()}\n\n Save this voucher to login.`);

}

function checkvoucher(){
const inputcode = document.getElementById('voucherinput').value.trim().toUpperCase();
const purchases = JSON.parse(localStorage.getItem('wifipurchase')) || [];
const found = purchases.find(p => p.voucher === inputcode);


if(!found){
  alert("invalid voucher code");
  return;
}

const now = new Date();
const expiry = new Date(found.expiresAt);

if(now>expiry){
  alert(`voucher expired on ${found.expiresAt}`);
  return;
}

if(found.used){
  alert("voucher already used");
  return;
}


found.used = true;
localStorage.setItem("wifipurchase",JSON.stringify(purchases));

alert(`login successfully\n\n\npackage: ${found.label}\nexpires: ${found.expiresAt}`);
//this section requires a success pages that wishes congs to users

}






















