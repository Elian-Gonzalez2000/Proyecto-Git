const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

/*-----CODIGO PARA ANIMACION DE LAS IMAGENES AL CARGAR-----*/

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

	/*----CODIGO PARA SELECCIONAR LA CATEGORIA EN LA QUE ESTA EL USUARIO*/

	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
	 	elemento.addEventListener('click', (evento) => {
	 		evento.preventDefault();
	 		enlaces.forEach((enlace) => enlace.classList.remove('activo'));
	 		evento.target.classList.add('activo');

/*----CODIGO PARA EL FILTRADO POR CATEGORIA DE LAS IMAGENES----*/	
	 		const categoria = evento.target.innerHTML.toLowerCase();
	 		/*---ESTE CODIGO ES UNA CONDICIONAL USANDO "?"" Y ":"---*/
	 		categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`)
	 	});
	});

/*----CODIGO PARA EL FILTRADO DE LA BARRA DE BUSQUEDA----*/
	
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

	/*----CODIGO PARA MOSTRAR LAS IMAGENES EN VENTANAS EMERGENTES*/

	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		

		elemento.addEventListener('click', () => {
		const ruta = elemento.getAttribute('src');
		const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});

	/*----CODIGO PARA EL BOTON DE CERRAR----*/

	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	/*----CODIGO PARA EL OVERLAY----*/

	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});

