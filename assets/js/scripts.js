$(document).ready(function() {
  $.getJSON("./assets/js/testimonials.json", function(data) {
    var carouselInner = $('.carousel-inner');

    var cardsPerSlide = {
      mobile: 1,   // Número de cards por slide em resolução móvel
      tablet: 2,   // Número de cards por slide em resolução de tablet
      desktop: 3   // Número de cards por slide em resolução desktop
    };

    function updateCarousel() {
      var windowWidth = $(window).width();
      var activeSlide;
      
      if (windowWidth < 576) {
        activeSlide = cardsPerSlide.mobile;
      } else if (windowWidth < 992) {
        activeSlide = cardsPerSlide.tablet;
      } else {
        activeSlide = cardsPerSlide.desktop;
      }

      // Remover todos os itens do carousel
      carouselInner.empty();

      // Adicionar os itens ao carousel
      var activeIndex = 0;
      var slide = $('<div class="carousel-item active"><div class="row"></div></div>');
      carouselInner.append(slide);

      $.each(data, function(index, item) {
        var cardColumn = $('<div class="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center"></div>');
        var card = $('<div class="card" >' +
          '<img src="assets/images/userico.png" class="card-img" alt="testimonial image">' +
          '<div class="card-body ">' +
          '<h5 class="card-title text-center">' + item.name + '</h5>' +
          '<p class="card-text text-center">' + item.description + '</p>' +
          '</div>' +
          '</div>');

        cardColumn.append(card);
        slide.find('.row').append(cardColumn);

        if ((index + 1 ) % activeSlide === 0) {
          activeIndex++;
          slide = $('<div class="carousel-item"><div class="row"></div></div>');
          carouselInner.append(slide);
        }
      });

      // Ativar o carousel
      $('.carousel').carousel();
    }

    // Atualizar o carousel quando a janela for redimensionada
    $(window).on('resize', function() {
      updateCarousel();
    });

    // Atualizar o carousel pela primeira vez
    updateCarousel();
  });
});
