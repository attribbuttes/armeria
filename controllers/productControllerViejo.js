const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const productController = {
    index: (req,res)=> {

        const allProducts = products;

        const inSaleProducts = products.filter((product)=> product.category === 'in-sale')
        const visitedProducts = products.filter((product)=> product.category === 'visited')
        return res.render('products', {allProducts, inSaleProducts, visitedProducts}); 
    },
    create: (req,res)=> {
        return res.render('productCreateForm');
    },

    store: (req,res)=> {


        //necesito pushear al array un nuevo objeto literal
        //los pasos a seguir en el nueov objeto literal
        //convertir price a numero
        //agregar los campos id e image
        const productToCreate = req.body; //se hace copia al body para no tocar el body directo
        productToCreate.price = Number(productToCreate.price); //convertido a numero el precio                = Number(req.body.price) seria lo mismo
        // hasta aca guarde el precio
        productToCreate.image = req.file.filename; //para decirle q eso es la imagen
        //para guardarlo en el objeto q estoy creando, hasta entonces el objeto era mucho mas pequeño, sin id, sin image
        //hay q convertir el discount q si viene vacio lo convierta a un 0
        if(productToCreate.discount == ''){
            productToCreate.discount = 0;
        } else { //si no es vacio, entonces viene como string, si viene algo entonces convertilo a number
            productToCreate.discount = Number(productToCreate.discount);
        };
        //falta el id, a la cantidad de items en el array , su lenth sumale 1
        productToCreate.id = products.length +1;

        const ultimoElementoDelArray = products[products.length-1];
        const nuevoId = ultimoElementoDelArray.id +1; 
        //aca tengo el ultimo elemento, "array en la calve, array.lenth -1"
        //entonces nmuevo id seria, ultimo elementos delaraay .id +1, le suma 1 al ultimo elemento q era
        //desde aca el productro ya esta listo para ser guardado en la base de de datos
        //el objeto fue construido
        //ahora voy a GUARDAR EN LA BASE DE DATOS
        //hay q llamar a fs
        //agregar, metodo push
        //fs.writeFileSync(nuievosproductos)
        //Array.push

        products.push(productToCreate);
        //el producto a sido sumado al array
        //lo pusheamos al onjeto en memoria 

        //ahora hay q escribirlo en el json, con el nuevo elemetno
        //espera una ruta hacia un archivo y 2ndo parametro los datos a escribiur
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))//para q lo guarde formateado el 2
        //entonces, productsFilePath es la base de datos propiamente dicha a la cual le estas guardando el nuevo objeto products, stringifiado x q si no el JSON no lo lee

        return res.render('products');



    },
    
    detail: (req, res) => {
		const idToFind = req.params.id
        const product = products.find (p => p.id == idToFind)
        const discounted = Math.round(product.price - (product.price * product.discount) / 100)

		return res.render ('detail', {product, discounted})
	
	},

    armasCortas: (req,res)=> {

        const allProducts = products;
        const armasCortas = products.filter((product)=> product.category ==='armasCortas')
        return res.render('armasCortas', {armasCortas, allProducts}); 
    },
    armasLargas: (req,res)=> {

        const allProducts = products;
        const armasLargas = products.filter((product)=> product.category ==='armasLargas')
        return res.render('armasLargas', {armasLargas, allProducts}); 
    },
    camping: (req,res)=> {

        const allProducts = products;
        const camping = products.filter((product)=> product.category ==='camping')
        return res.render('camping', {camping, allProducts}); 
    },
    edit: (req,res)=> {
        return res.send('editar producto')
    },
    update: (req,res)=> {
        return res.send('actualizar')
    },
    delete: (req,res)=> {
        return res.send('eliminar producto')
    },

    shoppingCart: (req,res)=> {
        return res.send('ShioppingCart');
    },
    donde: (req,res)=> {
        return res.render('quienes')
    },            
}

module.exports=productController;

