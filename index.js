

 (function() {
  const sideBarMenu = document.querySelector('#sidebarMenu');
  const selector = document.querySelector('input[type=checkbox]');
  const closebtns = document.getElementsByClassName("dropdown");

  for (let i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function() {
      selector.checked = false;
    });
  }
 })()

const nomeInput = document.querySelector('#nome')
const emailInput = document.querySelector('#email')
const comentarioInput = document.querySelector('#comentario')
const messageSent = document.querySelector('.message-sent')
const formBtn = document.querySelector('#form-btn')

 function validateEmail(emailInput) {
	const mailformat = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
	if(!emailInput.match(mailformat))
	{
		return false;
	}
  return true
}

 function isAllDataFillup(nomeInput, emailInput, comentarioInput) {

  const nome = (nomeInput).trim();
  const email = (emailInput).trim();
  const comment = (comentarioInput).trim();

  const hasNome = nome !== "" && isNaN(nome);
  const hasEmail = email !== "";

  const isValidEmail = validateEmail(email);

  const hasComment = comment !== "";

  return hasNome && hasEmail && isValidEmail && hasComment;
 }

 function setTemplateData(nomeInput, emailInput, comentarioInput) {
   return `
   <div class="footer">
   <p style="color: green">Mensagem recibido com successo.</p>
   <p>Dados enviados:</p>
   <ul>
     <li>
       <strong>NOME:</strong> ${nomeInput}
     </li>
     <li>
       <strong>EMAIL:</strong> ${emailInput}
     </li>
     <li>
       <strong>COMENTARIO:</strong> ${comentarioInput}
     </li>
   </ul>
   <p>Datos persoa contato:</p>
   <div style="display: flex; margin-top: 1.5rem">
   <span style="
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem
    ">
    <img src="https://www.peritosbrasil.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.811070a8.png&amp;w=128&amp;q=75"/>
    </span>
        <div>
          <p style="margin: 4px">
            <strong>Juan Tomas Beneyto Paysal</strong>
          </p>
          <p style="margin: 4px">
            <i>
              <span style="color: #c6c6c6">Criminalista e Perito Judicial</span>
            </i>
          </p>
          <p style="margin: 4px">
            <a href="https://www.peritosbrasil.com">www.peritosbrasil.com</a>
            <span style="margin-left: 12px"> (+55)(85) 3232 90 22</span>
          </p>
        </div>
        </div>
    </div>
 `
 }

 function resetForm() {
  nomeInput.textContent = ''
  emailInput.textContent = ''
  comentarioInput.textContent = ''
}

function sendEmail(e, nomeInput, emailInput, comentarioInput) {
  e.preventDefault();
  const template = setTemplateData(nomeInput, emailInput, comentarioInput);
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "jnk.beneyto@gmail.com",
    Password : "69B5A82D1F9CB97F30B97C697E526F81BBBF",
    To : 'juankete78@gmail.com',
    From : `${emailInput}`,
    Subject : `Consulta web de ${nomeInput}`,
    Body : template
  }).then( message => 
    {
      messageSent.style.opacity = 1;
      messageSent.style.background = 'green';
      messageSent.textContent = "Mensagem enviado con succeso.";

      resetForm();
      if(message !== "OK") {
        messageSent.style.background = 'red';
        messageSent.textContent = message
      } 

      setInterval(() => {
        messageSent.style.opacity = 0;
      },5000);
    }
  );
}

formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const validation = isAllDataFillup(nomeInput.value, emailInput.value, comentarioInput.value);
  if (!validation) {
    console.log('validation', validation)
    messageSent.style.opacity = 1;
    messageSent.style.background = 'red';
    messageSent.textContent = "Preencha todos os campos / erro na data introducida"
  
  setInterval(() => {
        messageSent.style.opacity = 0;
      },5000);
  } else {
    sendEmail(e, nomeInput.value, emailInput.value, comentarioInput.value);
  }
})
