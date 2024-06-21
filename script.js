//Mode Toggler
$("#mode-toggler").click(function () {
    $("body").toggleClass("light");
    let mode = $("body").hasClass("light") ? "light" : "dark";

    switch (mode) {
        case "light":
            $("#mode-toggler").html('<i class="fa-solid fa-moon" style = "color: #191719;"></i>');
            $(".check-btn").css("color", "#191719");
            $(".flip-card-front").css("color", "#bcbaba")
            $(".send-btn").css("color", "#191719")
            $("footer a").css("color", "#191719")
            break;
        case "dark":
            $("#mode-toggler").html('<i class="fa-regular fa-sun"></i>');
            $(".check-btn").css("color", "#bcbaba");
            $(".send-btn").css("color", "#bcbaba");
            $("footer a").css("color", "#bcbaba")
            break;
    }
});

//Sticky navbar
window.addEventListener("load", function () {
  const navbar = document.getElementById("navbar");
  const placeholder = document.getElementById("navbar-placeholder");
  const titleSection = document.getElementById("home");

  if (!navbar) {
    console.error("Navbar element not found");
    return;
  }

  var stickyPoint = titleSection.offsetHeight;

  window.onscroll = function () {
    console.log("Current scroll position:", window.scrollY);
    console.log("Sticky point:", stickyPoint);

    if (window.scrollY >= stickyPoint) {
      navbar.classList.add("sticky");
      placeholder.style.height = navbar.offsetHeight + "px";
    } else {
      navbar.classList.remove("sticky");
      placeholder.style.height = "0";
    }
  };
});

//Auto close navbar
document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.getComputedStyle(navbarCollapse).getPropertyValue('display') !== 'none') {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    });
  });
});

//Send email
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const status = document.getElementById("form-status");

    fetch("https://formspree.io/f/xeqywvqr", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thank you for your message!";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form.";
            }
          });
        }
        setTimeout(() => {
          status.innerHTML = "";
        }, 5000);
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form.";
      });
  });
