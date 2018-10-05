$('#projetos-3d, #contato-form').hide();

let projetosFront = '';
let projetosFrontDiv = $('#projetos-front');
let projetos3D = '';
let projeto3dDiv = $('#projetos-3d');

$.ajax({
  url: "http://lucasmendoncaportfolio.atwebpages.com/json/projetosHome.json", success: function (projetos) {
    let todosProjetos = JSON.parse(projetos);
    for (let projeto of todosProjetos["Projetos-Front"]) {
      projetosFront += `<div class='projeto-container' title='${projeto.Title}' onclick="window.open('${projeto.Link}', '_blank');"><div class='projeto'><div class='imagem-projeto' style="background-image:url('${projeto.Imagem}'); background-color:${projeto.BgdColor}; background-position: ${projeto.ImagePosition};"></div></div></div>`;
    }
    projetosFrontDiv.append(projetosFront);

    for (let projeto3D of todosProjetos["Projetos-3d"]) {
      projetos3D += `<div class='projeto-container'  title='${projeto3D.Title}'  onclick="window.open('${projeto3D.Link}', '_blank');"><div class='projeto'><div class='imagem-projeto' style="background-image:url('${projeto3D.Imagem}'); background-color:${projeto3D.BgdColor}; background-position: ${projeto3D.ImagePosition}; "></div></div></div>`;
    }
    projeto3dDiv.append(projetos3D);

    $('#form').show();

    $('body').click(function () {
      $('#email-form, #assunto-form, #mensagem-form').removeClass('required');
    });

    $('.enviar-mensagem').click(function (e) {
      e.stopPropagation();
      if ($('#email-form').val() && $('#assunto-form').val() && $('#mensagem-form').val()) {
        $('.enviar-mensagem').prop('disabled', true).addClass('botao-bloqueado');
        $('.popup-send').show();
        var data = {
          service_id: 'gmail',
          template_id: 'template_QiacN1VF',
          user_id: 'user_RuX22JRZ6EK5jrMqshEZR',
          template_params: {
            'name': $('#email-form').val(),
            'subject': $('#assunto-form').val(),
            'message': $('#mensagem-form').val()
          }
        };

        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
        }).done(function () {
          $('.popup-success').show();
          $('.popup-loading').hide();
          $('.enviar-mensagem').prop('disabled', false).removeClass('botao-bloqueado');
          $('#email-form').val('');
          $('#assunto-form').val('');
          $('#mensagem-form').val('');
        }).fail(function (error) {
          $('.popup-send,.popup-success').hide();
          $('.popup-loading').show();
          $('.enviar-mensagem').prop('disabled', false).removeClass('botao-bloqueado');
          alert('Erro ao enviar e-mail!');
        });
      } else {
        if (!$('#email-form').val()) { $('#email-form').addClass('required'); }
        if (!$('#assunto-form').val()) { $('#assunto-form').addClass('required'); }
        if (!$('#mensagem-form').val()) { $('#mensagem-form').addClass('required'); }
      }
    });

    $('.button-popup-ok').click(function () {
      $('.popup-send,.popup-success').hide();
      $('.popup-loading').show();
    });


  }
});

function selectAba(abaSelecionada) {
  if (abaSelecionada == "front") {
    $('.li-bar').removeClass('li-selected');
    $('#li-front').addClass('li-selected');
    $('#projetos-front').show();
    $('#projetos-3d, #contato-form').hide();
  } else if (abaSelecionada == "3d") {
    $('.li-bar').removeClass('li-selected');
    $('#li-3d').addClass('li-selected');
    $('#projetos-3d').show();
    $('#projetos-front, #contato-form').hide();
  } else {
    $('.li-bar').removeClass('li-selected');
    $('#li-contato').addClass('li-selected');
    $('#contato-form').show();
    $('#projetos-front, #projetos-3d').hide();
  }
}