
const db = require('../../data/db-config')



const checkSchemeId = async (req, res, next) => {

  try{
    const existScheme = await  db('schemes').where('scheme_id', req.params.scheme_id).first()
    if(!existScheme){
      next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found` })
    }else{
      req.scheme = existScheme
      next()
    }
  }catch(err){
    next(err)
  }
}



const validateScheme = (req, res, next) => {

  try{
    const {scheme_name} = req.body
    if( scheme_name === undefined  || typeof  scheme_name !=='string' || !scheme_name.trim() ){
      next({ status: 400, message: `invalid scheme_name` }) 
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}


const validateStep = (req, res, next) => {

  try{
    const {instructions, step_number} =req.body
    if(!instructions  || typeof  instructions !=='string' || !instructions.trim() 
    ||typeof  step_number !=='number' || step_number<1){
      next({ status: 400, message: `invalid step` })  
    }else{
      next()
    }

  }catch(err){
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
