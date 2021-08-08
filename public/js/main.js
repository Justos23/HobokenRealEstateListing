profile=document.getElementById("profile");
login=document.getElementById("login");

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('authenticated')) {
    profile.classList.remove(hidden);
    login.classList.add(hidden);
}