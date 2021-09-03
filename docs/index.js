// 홈 흔들림 효과
function effect1() {
  const $window = $(window);

  let windowWidth = $window.width();
  let windowHeight = $window.height();

  $window.resize(_.throttle(function () {
    windowWidth = $window.width();
    windowHeight = $window.height();
  }, 100));

  $window.resize(_.throttle(function () {
    MousemoveEffect1__update();
  }, 100));

  let MousemoveEffect1__$el = null;
  let MousemoveEffect1__lastPosX = 0;
  let MousemoveEffect1__lastPosY = 0;

  function MousemoveEffect1__update() {
    MousemoveEffect1__$el.each(function (index, node) {
      const $node = $(node);
      const horRes = $node.data('data-mousemove-effect1-hor-res');
      const verRes = $node.data('data-mousemove-effect1-ver-res');

      const x = (MousemoveEffect1__lastPosX - (windowWidth / 2)) * horRes;
      const y = (MousemoveEffect1__lastPosY - (windowHeight / 2)) * verRes;
      $(node).css('transform', 'translateX(' + x + 'px) translateY(' + y + 'px)');

      console.log("MousemoveEffect1__lastPosX : " + MousemoveEffect1__lastPosX);
      console.log("MousemoveEffect1__lastPosY : " + MousemoveEffect1__lastPosY);
    });
  }

  function MousemoveEffect1__init() {
    MousemoveEffect1__$el = $('.mousemove-effect-1-el');

    MousemoveEffect1__$el.each(function (index, node) {
      const $node = $(node);
      $node.data('data-mousemove-effect1-hor-res', $node.attr('data-mousemove-effect1-hor-res') * 1);
      $node.data('data-mousemove-effect1-ver-res', $node.attr('data-mousemove-effect1-ver-res') * 1);
    });

    const MousemoveEffect1__updateThrottled = _.throttle(function () {
      MousemoveEffect1__update();
    }, 5);

    $window.mousemove(function (e) {
      MousemoveEffect1__lastPosX = e.clientX;
      MousemoveEffect1__lastPosY = e.clientY;

      MousemoveEffect1__updateThrottled();
    });
  }

  MousemoveEffect1__init();
}

effect1();

// 홈 메인 gsap
function effect2() {

  gsap.from(".main_txt>span:nth-of-type(1)", {
    y: 50,
    opacity: 0,
    duration: 0.8,
  })

  gsap.from(".main_txt>span:nth-of-type(2)", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
  })


  gsap.from(".info", {
    y: 10,
    opacity: 0,
    duration: 0.8,
    delay: 1,
  })

  gsap.from(".button", {
    opacity: 0,
    duration: 0.8,
    delay: 1,
  })


  gsap.from(".graphic1", {
    opacity: 0,
    duration: 1.6,
    delay: 0.8,
    ease: Power2.easeIn,
  })

}

effect2();

// 어바웃미 풀페이지
new fullpage('#fullpage', {
  responsiveWidth: 600,
  /* scrollOverflow:true, */
  navigation: true,
  navigationPosition: 'left',
  anchors: ['hero', 'overView', 'readMore', 'skills', 'profile']
});

const $current = $('.section.fp-section.active');
$current.removeClass('active');
setTimeout(function () {
  $current.addClass('active');
});

// 어바웃미 효과

// 포트폴리오 탭메뉴

function TabBox__changed(eventType, tbName, tbItemNo) {
  //console.log(`eventType : ${eventType}, tbName : ${tbName}, tbItemNo : ${tbItemNo}`);
}

function TabBox__init() {
  $('[data-tb]').each(function (index, el) {
    const $el = $(el);
    const tbAttrValue = $el.attr('data-tb');

    const tbAttrValueBits = tbAttrValue.split('__');

    const tbName = tbAttrValueBits[0];
    const tbItemNo = parseInt(tbAttrValueBits[1]);
    const tbItemType = tbAttrValueBits[2];

    $el.data('data-tbName', tbName);
    $el.data('data-tbItemNo', tbItemNo);
    $el.data('data-tbItemType', tbItemType);

    if (tbItemType == 'head') {
      const $items = $(`[data-tb^="${tbName}__"]`);
      const $bodyItem = $(`[data-tb="${tbName}__${tbItemNo}__body"]`);

      $el.click(function () {
        const $activedItems = $(`[data-tb^="${tbName}__"].tb-active`);

        if ($activedItems.length > 0) {
          const oldNo = $activedItems.eq(0).data('data-tbItemNo');

          if (oldNo == tbItemNo) {
            return;
          }

          $activedItems.removeClass('tb-active');
          $('html').removeClass(`${tbName}__${oldNo}__actived`);
          if (TabBox__changed) {
            TabBox__changed('inactive', tbName, oldNo);
          }
        }

        $(`[data-tb="${tbName}__${tbItemNo}__head"]:not(.tb-active)`).addClass('tb-active');
        $bodyItem.addClass('tb-active');

        $('html').addClass(`${tbName}__${tbItemNo}__actived`);
        if (TabBox__changed) {
          TabBox__changed('active', tbName, tbItemNo);
        }
      });
    }
  });

  $('[data-tb-clicked]').click();
}

TabBox__init();



// 컨택트 폼
function sendEmailForm(form) {
  if (form._replyto.value.length == 0) {
    alert('이메일 주소를 입력해주세요.');
    form._replyto.focus();
    return;
  }

  if (form.message.value.length == 0) {
    alert('메세지를 입력해주세요.');
    form.message.focus();
    return;
  }

  form.submit();

  form._replyto.value = '';
  form.message.value = '';
  form.submit1.innerHTML = '전송되었습니다.';
  form.submit1.disabled = true;
}