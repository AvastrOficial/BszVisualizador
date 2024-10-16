  // Función para copiar el código al portapapeles
function copyToClipboard() {
    const textarea = document.getElementById("generatedCode");
    textarea.select(); // Seleccionar el contenido del textarea
    textarea.setSelectionRange(0, 99999); // Para dispositivos móviles
    document.execCommand("copy"); // Copiar el contenido al portapapeles

    // Mostrar una pequeña notificación de que se ha copiado
    alert("Código copiado al portapapeles");
}

// Función para manejar la subida de archivos
async function handleImageUpload() {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    const checkIcon = document.getElementById("checkIcon");

    // Simula el click en el input de archivo
    imageInput.click();

    // Espera la selección de un archivo
    imageInput.onchange = async () => {
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const formData = new FormData();
            formData.append('reqtype', 'fileupload');
            formData.append('fileToUpload', file);

            try {
                // Usar un proxy CORS para evitar problemas
                const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                const apiUrl = 'https://catbox.moe/user/api.php';

                // Paso 1: Subir a Catbox
                const response = await fetch(proxyUrl + apiUrl, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.text();

                if (response.ok && data.startsWith("https://")) {
                    // Colocar la URL en el input de texto
                    document.getElementById("iconUrlInput").value = data;

                } else {
                    console.error("Error en la carga del archivo:", data);
                    alert("Hubo un problema al subir el archivo. Por favor, inténtalo de nuevo.");
                }
            } catch (error) {
                console.error("Error al subir el archivo:", error);
                alert("Error de conexión al subir el archivo.");
            }
        }
    };
}

// Función para generar el código HTML y visualizar la imagen
function generateCode() {
    const url = document.getElementById("urlInput").value;
    const label = document.getElementById("labelInput").value;
    const color = document.getElementById("colorSelect").value; // Obtener color de entrada
    const iconUrl = document.getElementById("iconUrlInput").value;
    const redirectUrl = document.getElementById("redirectUrlInput").value; // Obtener URL de redirección

    // Generar la URL para la imagen del contador de visualizaciones
    const imgSrc = `https://visitcount.itsvg.in/api?id=${encodeURIComponent(url)}&color=${color}&label=${encodeURIComponent(label)}`;
    
    // Mostrar la imagen en el contenedor de resultados
    const bgIconElement = document.getElementById("backgroundIcon");
    const overlayIconElement = document.getElementById("overlayIcon");
    const clickableDiv = document.getElementById("clickableDiv");

    bgIconElement.src = imgSrc;
    bgIconElement.style.display = 'block';

    overlayIconElement.src = iconUrl;
    overlayIconElement.style.display = 'block';

    // Configurar la URL de redirección
    clickableDiv.href = redirectUrl ? redirectUrl : ''; // Si hay URL, usarla, si no, dejar vacío
    clickableDiv.style.cursor = redirectUrl ? 'pointer' : 'default'; // Cambiar el cursor

    // Generar el código HTML, omitiendo el href si no hay URL
    const generatedHTML = redirectUrl 
        ? `<div style="position: relative; display: inline-block;">
            <a href="${redirectUrl}" style="display: block; cursor: pointer;">
                <img src="${imgSrc}" style="display: block;"/>
                <img src="${iconUrl}" style="position: absolute; top: 0; left: 0; width: 22px; height: 22px; border-radius: 50%;"/>
            </a>
        </div>` 
        : `<div style="position: relative; display: inline-block;">
            <a style="display: block; cursor: default;">
                <img src="${imgSrc}" style="display: block;"/>
                <img src="${iconUrl}" style="position: absolute; top: 0; left: 0; width: 22px; height: 22px; border-radius: 50%;"/>
            </a>
        </div>`;

    document.getElementById("generatedCode").value = generatedHTML; // Asignar el código generado al textarea
}

// Función para actualizar el color de fondo según la selección
function updateColorInput() {
    const colorSelect = document.getElementById("colorSelect");
    const selectedColor = colorSelect.value;
    document.getElementById("backgroundIcon").style.backgroundColor = selectedColor;
}

// Envolver el código de inicialización en DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // Aquí puedes agregar cualquier código que necesites ejecutar al cargar la página
});
