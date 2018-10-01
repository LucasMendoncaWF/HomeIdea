$('#projetos-3d, #contato-form').hide();

let projetosFront = '';
for (let projetoFront = 0; projetoFront < 10; projetoFront++) {
  projetosFront += `<div class='projeto-container'><div class='projeto'><div class='imagem-projeto'></div></div></div>`;
}

$('#projetos-front').append(projetosFront);

let projetos3D = '';
for (let projeto3D = 0; projeto3D < 10; projeto3D++) {
  projetos3D += `<div class='projeto-container'><div class='projeto'><div class='imagem-projeto'></div></div></div>`;
}
$('#projetos-3d').append(projetosFront);

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