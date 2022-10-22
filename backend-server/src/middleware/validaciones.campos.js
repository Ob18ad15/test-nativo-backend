/**
 Verificar campo se complementa para validar si la variable  de errores  en el metodo check estan vacias,
 puede continuar el proceso... sino se detiene la ejecución. Ver archivo de rutas en la funcion de 
 crear task
 */
const { validationResult } = require ('express-validator')

const verificarCampos = (req, res, next) => {

    const errores = validationResult(req)
  
    if(errores.isEmpty()) {
      next();
    }else{
      return res.status(400).json({
        errors: errores.mapped()
      })
    }
  
  }
  
  module.exports = { verificarCampos }