var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let pics = document.getElementsByClassName("slides");
  if (n > pics.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (let i = 0; i < pics.length; i++) {
    pics[i].style.display = "none";
  }
  pics[slideIndex-1].style.display = "block";
}

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});