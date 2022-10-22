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