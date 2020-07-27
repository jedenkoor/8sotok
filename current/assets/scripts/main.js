function showBillet(billet){
  billet.addClass('billet_active');
}
function hideBillet(billet){
  billet.removeClass('billet_active');
}

$(document).ready(function(){
  


  if($('.itemCard-slider').length){
    $('.itemCard-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.itemCard-containerArr__arr_prev'),
      nextArrow: $('.itemCard-containerArr__arr_next'),
    })
  }

  if($('.village-slider').length){
    $('.village-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.village-slider-arr_prev'),
      nextArrow: $('.village-slider-arr_next'),
    })
  }

  if($('#itemCard-block__map').length){
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("itemCard-block__map", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }
  }


  if($('#compare').length){
    //! Делаем запрос по api получаем объекты для сравнения в таком формате


    var arr = [{
      img: 'assets/images/itemCompare.jpg',
      price: '120 000 000',
      options: {
        'Адрес': 'Проспект Испытателей, 0',
        'Метро': 'Комендантский проспект',
        'Ипотека': 'Да',
      }
    },{
      img: 'assets/images/itemCompare.jpg',
      price: '1 000 000',
      options: {
        'Адрес': 'Проспект Испытателей, 33',
        'Метро': 'Комендантский проспект',
        'Выход на улицу': 'Конечно',
      }
    },{
      img: 'assets/images/itemCompare.jpg',
      price: '1 000 000',
      options: {
        'Адрес': 'Проспект Ис213пытателей, 33',
        'Метро': 'Комендантский проспект',
        'Выход на улицу': '123',
      }
    }]
    var KEYS = new Set();

    for(let item in arr){ //** Создаем SET с уникальными ключами для вывода их в левом aside **//
      for(let option in arr[item].options){
        KEYS.add(option);
      }
    }
    KEYS = [...KEYS] //** SET преобразовываем в массив
    
    for(let key in KEYS){  //** Пробегаем по массиву и добавляем эти ключи в левый столбик 
      $('.compare-aside').append($(`<div class="compare-aside-ceil">${KEYS[key]}</div>`))
    }

    for(let item in arr){ //** Пробегаем по сравниваемым объектам и выводим ячейку_head
      $('.compare-content').append($(
        `<div class="compare-content-item" data-num="${item}">
          <div class="compare-content-item-ceil compare-content-item-ceil_head">
            <div class="compare-content-item-ceil__img"><img src="${arr[item].img}" alt=""></div>
            <div class="compare-content-item-ceil__price"><span>${arr[item].price}</span>&nbsp;руб</div>
            <button class="btn compare-content-item-ceil__btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9678 12.9791V15.3877C16.9687 15.6113 16.9229 15.8327 16.8333 16.0375C16.7438 16.2424 16.6124 16.4263 16.4476 16.5775C16.2828 16.7286 16.0883 16.8437 15.8765 16.9154C15.6647 16.987 15.4402 17.0136 15.2175 16.9935C12.7469 16.725 10.3737 15.8808 8.28865 14.5286C6.34875 13.2959 4.70406 11.6512 3.47136 9.71135C2.11448 7.61679 1.27006 5.23206 1.00652 2.75036C0.986453 2.52834 1.01284 2.30457 1.084 2.0933C1.15515 1.88203 1.26952 1.6879 1.41981 1.52325C1.57011 1.35861 1.75304 1.22706 1.95696 1.13699C2.16088 1.04691 2.38132 1.00029 2.60425 1.00008H5.0129C5.40254 0.996243 5.78028 1.13422 6.07572 1.3883C6.37116 1.64237 6.56413 1.99521 6.61866 2.38103C6.72032 3.15185 6.90886 3.9087 7.18068 4.63713C7.2887 4.9245 7.31208 5.23682 7.24804 5.53707C7.18401 5.83732 7.03525 6.11292 6.81938 6.33121L5.79972 7.35087C6.94267 9.36092 8.60696 11.0252 10.617 12.1682L11.6367 11.1485C11.855 10.9326 12.1306 10.7839 12.4308 10.7198C12.7311 10.6558 13.0434 10.6792 13.3308 10.7872C14.0592 11.059 14.816 11.2476 15.5869 11.3492C15.9769 11.4042 16.333 11.6007 16.5877 11.9012C16.8423 12.2017 16.9776 12.5853 16.9678 12.9791Z" stroke="#DA4302" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>          
              Показать контакты
            </button>
            <button class="compare-content-item-ceil__close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L7 7M1 13L7 7M7 7L13 13M7 7L1 1" stroke="#FAFFFD" stroke-width="1.5" stroke-linecap="round"/>
              </svg>          
            </button>
          </div>
        </div>`))
    }
    for(let item in arr){ //** пробегаем по объектам и каждому выставляем значения для ключей
      for(let key in KEYS){
        if(arr[item].options[KEYS[key]] == undefined){
          
          $(`.compare-content-item[data-num="${item}"]`).append(
            $(`<div class="compare-content-item-ceil compare-content-item-ceil_empty">Не указано</div>`)
          )
        } else {
          $(`.compare-content-item[data-num="${item}"]`).append(
            $(`<div class="compare-content-item-ceil">${arr[item].options[KEYS[key]]}</div>`)
          )
        }
      }
    }


    $(document).on('mouseover', '.compare-aside-ceil:not(.compare-aside-ceil_head), .compare-content-item-ceil:not(.compare-content-item-ceil_head)', function(){
      $('.hoverCeil').each(function(){
        $(this).removeClass('hoverCeil');
      })
      var ind = $(this).index() + 1;
      $(`.compare-content-item .compare-content-item-ceil:nth-child(${ind})`).addClass('hoverCeil');
      $(`.compare-aside .compare-aside-ceil:nth-child(${ind})`).addClass('hoverCeil');
    })

    $(document).on('change', '.compare-aside-ceil_head input', function(){
      var cols = $('.compare-content-item');
      if($(this).prop('checked') == true){
        $('.compare-content-item:nth-child(1) .compare-content-item-ceil:not(.compare-content-item-ceil_head)').each(function(){
          var indCeil = $(this).index() + 1;
          flag = 1;
          for(let i = 1; i <= cols.length; i++){
            if($(this).html() != $(`.compare-content-item:nth-child(${i}) .compare-content-item-ceil:nth-child(${indCeil})`).html()){
              flag = 0;
              break;
            } 
          }
          if (flag == 1) {
            console.log(indCeil);
            $(`.compare-content-item .compare-content-item-ceil:nth-child(${indCeil})`).addClass('dnCeil');
            $(`.compare-aside .compare-aside-ceil:nth-child(${indCeil})`).addClass('dnCeil');
          }
        })
      } else {
        $('.dnCeil').each(function(){
          $(this).removeClass('dnCeil');
        })
      }
    })


    $(document).on('click', '.compare-content-item-ceil__close', function(){
      $(this).closest('.compare-content-item').remove();

      //! Обработчик удаления из массива объектов для сравнения
    })


    //! высоту ячеек по самой большой
    


    //* DRAG-SCROLL
    var clicked = false, clickX;
    $('.compare-content').on({
      'mousemove': function(e) {
        clicked && updateScrollPos(e);
      },
      'mousedown': function(e) {
        clicked = true;
        clickX = e.pageX;
      },
    });
    $(document).on({
      'mouseup': function() {
        clicked = false;
        $('.compare-content').css('cursor', 'grab');
      }
    })
    var updateScrollPos = function(e) {
      $('.compare-content').css('cursor', 'grabbing');
      $('.compare-content').scrollLeft($('.compare-content').scrollLeft() + (clickX - e.pageX));
    }
  }



  $(document).on('click', '[data-compare=""]', function(e){
    e.preventDefault();
    hideBillet($('.billet_active'));
    showBillet($('.billet_compare'));
  })

  $(document).on('click', '[data-favourites=""]', function(e){
    e.preventDefault();
    hideBillet($('.billet_active'));
    showBillet($('.billet_favourites'));
  })

  $(document).on('click', '.billet__close', function(e){
    e.preventDefault();
    hideBillet($(this).closest('.billet'))
  })


  $(document).on('click', '.putCall__btn', function(e){
    e.preventDefault();
    if(raValidation($(this).closest('form'))){
      $(this).closest('.putCall-form').hide();
      $(this).closest('.putCall-form').next('.putCall-success').show().css('display', 'flex');
      $(this).closest('.putCall-form').next('.putCall-success').find('span').html(
        $(this).prev('input').val()
      );
    }
  })

  $(document).on('click', '.putCall-success__btn', function(e){
    e.preventDefault();
    $(this).closest('.putCall-success').hide();
    $(this).closest('.putCall-success').prev('.putCall-form').show();

  })

  if($('.filter-sub').length){
    $('.filter-sub').slideUp();
  }
  $(document).on('click', '.filter-bot__more', function(e){
    e.preventDefault();
    $(this).toggleClass('filter-bot__more_down');
    $('.filter-sub').slideToggle();
  })


  $(document).on('click', function (e){
		var div = $('.inpBlock-select_active');
		if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.removeClass('inpBlock-select_active');
      div.find('.inpBlock-select-list').fadeOut();
		}
	});

  $(document).on('click', '.inpBlock-select-view', function(){
    $(this).closest('.inpBlock-select').toggleClass('inpBlock-select_active')
    $(this).next('.inpBlock-select-list').fadeToggle()
  })


  $(document).on('click', '.inpBlock-select-list p', function(){
    var select = $(this).closest('.inpBlock-select');
    var view = select.find('.inpBlock-select-view');
    var list = select.find('.inpBlock-select-list');

    var str = '';
    list.find('input[type="checkbox"]:checked').each(function(e, cb){
      //console.log($(this).next('p').innerHTML());
      //console.log($(this));
      
      
      str += $(this).next('p').html() + ', ';
    })
    function cb (){
      console.log(str);

    }
    
  })
}); 