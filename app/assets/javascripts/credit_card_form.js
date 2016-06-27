$(document).ready(function() {
  var submitHandler = function(event) {
    var $form = $(event.target);
    $form.find('input[type=submit]').prop('disabled', true);

    //If Stripe was initialized correctly this will create a token using the credit card info
    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
    } else {
      showError('Failed to process your Credit Card. Please reload this page');
    }
    return false;
  };

  $('.cc_form').on('submit', submitHandler);

  var stripeResponseHandler = function(status, response) {
    var $form = $('.cc_form');
    if (response.error) {
      console.log(response.error.message);
      showError(response.error.message);
      $form.find('input[type=submit]').prop('disabled', false);
    } else {
      var token = response.id;
      $form.append($('<input type=\"hidden\" name=\"payment[token]\" />')
                      .val(token));

      $('[data-stripe=number]').remove();
      $('[data-stripe=cvv]').remove();
      $('[data-stripe=exp-year]').remove();
      $('[data-stripe=exp-month]').remove();
      $('[data-stripe=label]').remove();
      $form.get(0).submit();
    }
    return false;
  };

  var showError = function(message) {

    if ($('#flash-messages').size() < 1) {
      $('div.container.main div:first')
                    .prepend('<div id="flash-messages"></div>');
    }

    $('#flash-messages').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
    $('.alert').delay(5000).fadeOut(3000);
    return false;
  };
});
