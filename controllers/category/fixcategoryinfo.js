const { category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  const data = isAuthorized(req);
  const{ categoryId, categoryname, budget, emoji } = req.body;

  try{
    if(data){
<<<<<<< HEAD
      // if (!budget) {
      //     if (!emoji) {
      //       await category.update({ categoryname }, { where: { id: categoryId } });
      //       return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
      //     } 
          
      //   await category.update({ categoryname, emoji }, { where: { id: categoryId } });
      //   return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
      // } 
      // else {
      //   if (!emoji) {
      //     const newBudget = budget.split(",").join("")
      //     await category.update({ categoryname, budget: newBudget }, { where: { id: categoryId } });
      //     return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
      //   } 
=======
      const categoryinfo = await category.findOne({ where: { userId: data.id, categoryname } })
      const categoryinfos = await category.findOne({ where: { userId: data.id, emoji } })
      if (categoryinfo) {
        return res.status(409).send({ message: "중복된 카테고리가 존재합니다" })
      }
      if (categoryinfos) {
        return res.status(409).send({ message: "중복된 이모지가 존재합니다" })
      }
      if (!budget) {
          if (!emoji) {
            await category.update({ categoryname }, { where: { id: categoryId } });
            return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
          } 
          
        await category.update({ categoryname, emoji }, { where: { id: categoryId } });
        return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
      } 
      else {
        if (!emoji) {
          const newBudget = budget.split(",").join("")
          await category.update({ categoryname, budget: newBudget }, { where: { id: categoryId } });
          return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
        }
>>>>>>> e00ecb8dbb18e70a3c71d3464e97f4e2d7b4ecbc
        const newBudget = budget.split(",").join("")
        await category.update({ categoryname, budget: newBudget, emoji }, { where: { id: categoryId } });
        return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
      // }
    }
    else{
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  }
  catch(err){
    console.log(err);
  }
}