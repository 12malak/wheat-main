// const allchefCards = (req, res) => { 
//     const b_id = req.params.id;
    
//        chefs.find({ $and: [ {b_id: { $in: b_id }} ]})
//         .then((data) => {   
//           console.log(data);
//           res.status(200).json(data);
//         })
//         .catch((error) => {
//           errorHandler(error, req, res);
//         });
//     };
    
    
// module.exports = {
//     allchefCards,
// }