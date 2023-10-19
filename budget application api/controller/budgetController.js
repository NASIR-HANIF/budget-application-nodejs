const budgetService = require("../services/budget.Services")

const getData = async (req, res) =>{
   const dataRes = await budgetService.findBudget();
   console.log(dataRes)
   res.status(200);
   res.json(dataRes)
}
const insertOurUpdateBudget = async (req,res)=>{
 const budgetRes = await budgetService.findBudget()
 
if(budgetRes.length == 0){
   const data = req.body
  let creatBudgetRes = await budgetService.createBudget(data)
  console.log(creatBudgetRes)
  res.status(200);
  res.json({
   message : "budget created",
     data : creatBudgetRes
  })
}else{
   const data = req.body
  const query = {
      _id : budgetRes[0]._id
   } 

   const dataRes = await budgetService.updataBudget(query ,data)
   console.log(dataRes)
   res.status(200);
   res.json({
      message : "Budget updated",
      data : dataRes
   })
}


}
module.exports = {
   getData :getData,
   insertOurUpdateBudget : insertOurUpdateBudget
} 
