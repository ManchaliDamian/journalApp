

export const fileUpload = async ( file ) => {
    
    // if(!file) throw new Error('No tenemos nigún archivo a subir');
    if(!file) return null; // Si no hay archivo, regresa un null
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwhv2bj6s/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });
        
        
        if(!resp.ok) throw new Error('Error al subir la imagen');

        const cloudResp = await resp.json();
        
        return cloudResp.secure_url; // regresa un string
        
    } catch (error) {
        // console.log(error);
        
        // throw new Error(error.message);
        return null;
    }
}