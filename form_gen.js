function selectElement(campo, tipo) {
    let columna = document.getElementById(campo);
    let columnaPhp = document.getElementById(campo + "_php");
    let campoSeleccionado = document.getElementById(campo + "Tr");
    let inputSeleccionado = document.getElementById(campo + tipo);
    let checkBootstrap = document.getElementById("bootstrap");
    let classBootstrap, classBootstrapCheck, classBootstrapRange, classBootstrapColor, classBootstrapBtn;

    clearElement(campo)
    if (checkBootstrap.checked === true) {
        classBootstrap = "class='form-control text-primary' ";
        classBootstrapCheck = "class='form-check-input' ";
        classBootstrapRange = "class='form-range' ";
        classBootstrapColor = "class='form-control form-control-color' ";
        classBootstrapBtn = "class='btn btn-primary' ";
    } else {
        classBootstrap = "";
        classBootstrapCheck = "";
        classBootstrapRange = "";
        classBootstrapColor = "";
        classBootstrapBtn = "";
    }
    campoSeleccionado.classList.toggle("border");
    campoSeleccionado.classList.toggle("border-danger");
    campoSeleccionado.classList.toggle("border-2");
    inputSeleccionado.classList.toggle("text-primary");
    inputSeleccionado.classList.toggle("fw-bold");

    switch (tipo) {
        case 'text':
            inputTag = `&lt;input type='text' ${classBootstrap} id='${campo}' name='${campo}' value = '${campo}' placeholder='${campo}' title='${campo}'&gt;`
            break;
        case 'number':
            inputTag = `&lt;input type='number' ${classBootstrap} id='${campo}' name='${campo}' value = '0' placeholder='${campo}' title='${campo}'&gt;`
            break;
        case 'hidden':
            inputTag = `&lt;input type='hidden' id='${campo}' name='${campo}' value = '${campo}' title='${campo}'&gt;`
            break;
        case 'password':
            inputTag = `&lt;input type='password' ${classBootstrap} id='${campo}' name='${campo}' value = '' placeholder='${campo}' title='${campo}'&gt;`
            break;
        case 'checkbox':
            inputTag = `&lt;input type='checkbox' ${classBootstrapCheck} id='${campo}' name='${campo}' value = '' placeholder='${campo}' title='${campo}'&gt; Label: ${campo}`
            break;
        case 'radio':
            inputTag = `&lt;input type='radio' ${classBootstrapCheck} id='${campo}' name='${campo}' value = '' placeholder='${campo}' title='${campo}'&gt; Label: ${campo}`
            break;
        case 'date':
            inputTag = `&lt;input type='date' ${classBootstrap} id='${campo}' name='${campo}' value = '2022-02-22' title='${campo}'&gt;`
            break;
        case 'file':
            inputTag = `&lt;input type='file' ${classBootstrap} id='${campo}' name='${campo}' accept='.pdf, .jpeg, .jpg' title='${campo}'&gt;`
            break;
        case 'range':
            inputTag = `&lt;input type='range' ${classBootstrapRange} id='${campo}' name='${campo}' min='0' max='10' step='1' value='3' title='${campo}'&gt;`
            break;
        case 'color':
            inputTag = `&lt;input type='color' ${classBootstrapColor} id='${campo}' name='${campo}' value = '#563d7c' title='${campo}'&gt;`
            break;
        case 'button':
            inputTag = `&lt;input type='button' ${classBootstrapBtn} id='${campo}' name='${campo}' value = '${campo}' onclick="alert('OnClick Action')" title='${campo}'&gt;<br>`
            inputTag += `&lt;input type='reset' ${classBootstrapBtn} id='${campo}' name='${campo}' value = 'reset' title='${campo}'&gt;<br>`
            inputTag += `&lt;input type='submit' ${classBootstrapBtn} id='${campo}' name='${campo}' value = 'Enviar' title='${campo}'&gt;`
            break;
        case 'select':
            inputTag = `&lt;select name='${campo}' id='${campo}' ${classBootstrap} onchange='this.form.submit()'&gt;<br>
                    &lt;option value='' selected&gt;Seleccionar item&lt;/option&gt;<br>
                    &lt;option value='1'&gt;Item 1&lt;/option&gt;<br>
                    &lt;option value='2'&gt;Item 2&lt;/option&gt;<br>
                    &lt;/select&gt;`
            break;
        case 'textarea':
            inputTag = `&lt;textarea id='${campo}' ${classBootstrap} name='${campo}' rows='5' cols='10' placeholder='${campo}' title='${campo}'&gt;${campo}&lt;/textarea&gt;`
            break;
        default:
            inputTag = "";
    }
    columna.innerHTML = inputTag;
    columnaPhp.innerHTML = `$${campo} = $_POST["${campo}"];`;
}

function clearElement(campo) {
    const inputLink = ["text", "number", "hidden", "password", "checkbox", "radio", "date", "file", "range", "color", "button", "select", "textarea"];
    let inputLinkLen = inputLink.length;
    let columna = document.getElementById(campo);
    let columnaPhp = document.getElementById(campo + "_php");
    let campoSeleccionado = document.getElementById(campo + "Tr");
    campoSeleccionado.classList.remove("border");
    campoSeleccionado.classList.remove("border-danger");
    campoSeleccionado.classList.remove("border-2");
    for (let i = 0; i < inputLinkLen; i++) {
        let inputSeleccionado = document.getElementById(campo + inputLink[i]);
        inputSeleccionado.classList.remove("text-primary");
        inputSeleccionado.classList.remove("fw-bold");
    }

    columna.innerHTML = "";
    columnaPhp.innerHTML = "";
}