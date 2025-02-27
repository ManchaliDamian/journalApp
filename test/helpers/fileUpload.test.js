import {v2 as cloudinary} from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'dwhv2bj6s',
    api_key: '778796762376272',
    api_secret: 'p_fCTbtfHuD36F82Y4PipkU32Os',
    secure: true

});


describe('Pruebas en fileUpload', () => { 
    
    test('Debe de subir el archivo correctamente a cloudinary', async() => { 
        

        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg';  

        const resp = await fetch(imageUrl);
        const blob = await resp.blob(); // toma los bytes de la imagen
        const file = new File([blob], 'foto.jpg'); //crea el archivo

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/'); // separa la url por / y lo guarda en un array
        const imageId = segments[segments.length - 1].replace('.jpg',''); // toma el ultimo elemento del array y le quita la extension .jpg
        await cloudinary.api.delete_resources( [imageId] ); // borra la imagen por ID
        
        
        

     })


    test('debe de retornar null', async() => { 
        
        const file = new File([], 'foto.jpg'); //crea el archivo

        const url =  await fileUpload(file); // dispara el error del catch

        expect(url).toBe(null);



      })




 })