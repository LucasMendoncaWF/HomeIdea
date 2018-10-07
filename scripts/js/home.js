//esconde projetos3D e o formulario de contato
$('#projetos-3d, #contato-form').hide();
//Declara variaves antes da consulta de projetos
var projetosFront = '';
var projetosFrontDiv = $('#projetos-front');
var projetos3D = '';
var projeto3dDiv = $('#projetos-3d');
//consulta os projetos no arquivo json no portal
$.ajax({
    url: "http://lucasmendoncapportfolio.atwebpages.com/json/projetosHome.json", success: function (projetos) {
        var todosProjetos = JSON.parse(projetos);
        //coloca os projetos front-end na p�gina
        for (var _i = 0, _a = todosProjetos["Projetos-Front"]; _i < _a.length; _i++) {
            var projeto = _a[_i];
            projetosFront += "<div class='projeto-container' data-title='" + projeto.Title + "' onclick=\"window.open('" + projeto.Link + "');\"><div class='projeto'><div class='imagem-projeto' style=\"background-image:url('" + projeto.Imagem + "'); background-color:" + projeto.BgdColor + "; background-position: " + projeto.ImagePosition + ";\"></div></div></div>";
        }
        projetosFrontDiv.append(projetosFront);
        //coloca os projetos 3d na p�gina
        for (var _b = 0, _c = todosProjetos["Projetos-3d"]; _b < _c.length; _b++) {
            var projeto3D = _c[_b];
            projetos3D += "<div class='projeto-container'  data-title='" + projeto3D.Title + "'  onclick=\"window.open('" + projeto3D.Link + "');\"><div class='projeto'><div class='imagem-projeto' style=\"background-image:url('" + projeto3D.Imagem + "'); background-color:" + projeto3D.BgdColor + "; background-position: " + projeto3D.ImagePosition + "; \"></div></div></div>";
        }
        projeto3dDiv.append(projetos3D);
        //ativa o formul�rio poder ser exibido na aba de contato
        $('#form').show();
        //remove a borda vermelha dos campos do form
        $('body').click(function () {
            $('#email-form, #assunto-form, #mensagem-form').removeClass('required');
        });
        //Envia e-mail
        $('.enviar-mensagem').click(function (e) {
            e.stopPropagation();
            //Verifica se os campos est�o preenchidos
            if ($('#email-form').val() && $('#assunto-form').val() && $('#mensagem-form').val()) {
                //bloqueia os botoes
                $('.enviar-mensagem').prop('disabled', true).addClass('botao-bloqueado');
                //Abre popup de carregando
                $('.popup-send').show();
                //Envia email
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
                //Realiza o envio pela API
                $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function () {
                    //mostra mensagem de sucesso
                    $('.popup-success').show();
                    $('.popup-loading').hide();
                    //habilita bot�es
                    $('.enviar-mensagem').prop('disabled', false).removeClass('botao-bloqueado');
                    //esvazia campos
                    $('#email-form').val('');
                    $('#assunto-form').val('');
                    $('#mensagem-form').val('');
                }).fail(function (error) {
                    //caso de erro, esconde a popup e reativa os bot�es
                    $('.popup-send,.popup-success').hide();
                    $('.popup-loading').show();
                    $('.enviar-mensagem').prop('disabled', false).removeClass('botao-bloqueado');
                    alert('Erro ao enviar e-mail!');
                });
            }
            else {
                //caso os campos n�o estejam preenchidos, ficar�o com a borda vermelha
                if (!$('#email-form').val()) {
                    $('#email-form').addClass('required');
                }
                if (!$('#assunto-form').val()) {
                    $('#assunto-form').addClass('required');
                }
                if (!$('#mensagem-form').val()) {
                    $('#mensagem-form').addClass('required');
                }
            }
        });
        //bot�o da popup que a fecha
        $('.button-popup-ok').click(function () {
            $('.popup-send,.popup-success').hide();
            $('.popup-loading').show();
        });
    }
});
//fun��o que esconde e mostra conte�dos das abas
function selectAba(abaSelecionada) {
    if (abaSelecionada == "front") {
        $('.li-bar').removeClass('li-selected');
        $('#li-front').addClass('li-selected');
        $('#projetos-front').show();
        $('#projetos-3d, #contato-form').hide();
    }
    else if (abaSelecionada == "3d") {
        $('.li-bar').removeClass('li-selected');
        $('#li-3d').addClass('li-selected');
        $('#projetos-3d').show();
        $('#projetos-front, #contato-form').hide();
    }
    else {
        $('.li-bar').removeClass('li-selected');
        $('#li-contato').addClass('li-selected');
        $('#contato-form').show();
        $('#projetos-front, #projetos-3d').hide();
    }
}
