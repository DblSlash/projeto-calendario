var select_mes = 0;
var click = null;
var eventos = localStorage.getItem('eventos') ? JSON.parse(localStorage.getItem('eventos')) : [];

const dias_mes = document.getElementById('DiasDoMes');

const AbaDeEventos = document.getElementById('AbaDeEventos');
const AbaDeApagarEvento = document.getElementById('AbaDeApagarEvento');
const background = document.getElementById('background');

const NomeDoEvento = document.getElementById('nome_evento');

const semana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

const voltar = document.getElementById("retornar_mes");
const avancar = document.getElementById("avancar_mes");
const salvar = document.getElementById('salvar_evento');
const cancelar = document.getElementById('cancelar');
const fechar = document.getElementById("fechar");
const apagar =  document.getElementById('apagar_evento');


function AbrirAba(date) {

  click = date;

  const DiaDeEvento = eventos.find(e => e.date == click);

  console.log(DiaDeEvento);

  if (DiaDeEvento) 
  {
    document.getElementById('evento_salvo').innerText = DiaDeEvento.title;
    AbaDeApagarEvento.style.display = 'block';
  } 
  else 
  {
    AbaDeEventos.style.display = 'block';
  }


}




function IniciarCalendario() 
{
  const data = new Date();
  
  


  if (select_mes !== 0) {data.setMonth(new Date().getMonth() + select_mes)};

  const dia = data.getDate();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  
  
  

  const Dia1DoMes = new Date(ano, mes, 1);
  
  const Dias_Do_Mes = new Date(ano, mes + 1, 0).getDate();
  
  const dateString = Dia1DoMes.toLocaleDateString('pt-br', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  
  const DiasExtras = semana.indexOf(dateString.split(', ')[0]);
  

  document.getElementById('NomeDoMes').innerText = `${data.toLocaleDateString('pt-br', { month:'long'}).toLocaleUpperCase()} ${ano}`;

  dias_mes.innerHTML = '';

  for (let i = 1; i <= DiasExtras + Dias_Do_Mes; i++) 
  {
    const DM = document.createElement('div');
    DM.classList.add("DM");

    const dayString = `${mes + 1}/${i - DiasExtras}/${ano}`;

    if (i > DiasExtras) 
    {
      DM.innerText = i - DiasExtras;
      
      const DiaDeEvento = eventos.find(e => e.date == dayString);

      if (i - DiasExtras === dia && select_mes === 0) 
      {
        DM.id = "Hoje";
      }

      if (DiaDeEvento) 
      {
        const DIVDeEvento = document.createElement('div');

        DIVDeEvento.classList.add('evento');
        DIVDeEvento.innerText = DiaDeEvento.title;
        DM.appendChild(DIVDeEvento);
      }

      DM.addEventListener('click', () => AbrirAba(dayString));
    } else {
      DM.classList.add('nulo');
    }

    dias_mes.appendChild(DM);    
  }
}

function FecharAba() 
{
  NomeDoEvento.classList.remove('erro');

  AbaDeEventos.style.display = 'none';

  AbaDeApagarEvento.style.display = 'none';

  background.style.display = 'none';

  NomeDoEvento.value = '';

  click = null;

  IniciarCalendario();
}

function SalvarEvento() 
{
  if (NomeDoEvento.value) 
  {
   

    eventos.push({date: click, title: NomeDoEvento.value,});

      NomeDoEvento.classList.remove('erro');

    localStorage.setItem('eventos', JSON.stringify(eventos));
    FecharAba();
  } 
  else 
  {
    NomeDoEvento.classList.add('erro');
  }
}

function ApagarEvento() 
{

  eventos = eventos.filter(e => e.date !== click);
  localStorage.setItem('eventos', JSON.stringify(eventos));
  FecharAba();

}

function Botoes() 
{

  avancar.addEventListener('click', () => {
    select_mes++;
    IniciarCalendario();
  });

  voltar.addEventListener('click', () => {
    select_mes--;
    IniciarCalendario();
  });
  salvar.addEventListener('click', SalvarEvento);
  apagar.addEventListener('click', ApagarEvento);
  cancelar.addEventListener('click', FecharAba);
  fechar.addEventListener('click', FecharAba);

}


Botoes();
IniciarCalendario();
