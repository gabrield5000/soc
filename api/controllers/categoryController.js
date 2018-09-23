'use strict';

const Category = require('../models/categoryModel');

exports.list = async (req, res, next) => {
	try {
		const categories = await Category.find();
       
		// if( categories.length < 0 ) {
		//     return res.status(409).json({ message: 'no categories exists' });
		// }
		categories.map(category => {
			return {
				category: category.name 
			};
		}); 
		res.status(200).json(categories);
        
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

exports.add = async (req, res, next) => {
	try {
		const category = new Category({
			category: req.body.category
		});
		await category.save();
		res.status(201).json({ massage: 'Created category successfully'});

	} catch (error) {
		res.status(500).json({ error: error });
	}
};

// exports.get = (req, res, next) => {
//     const id = req.params.id;
//     Product.findById(id)
//         .select( 'name imageUrl price _id' )
//         .exec()
//         .then( doc => {
//             console.log('get one entry from the DB', doc);
//             if (doc) {
//                 res.status(200).json({
//                     product: doc,
//                     request: {
//                         type: "GET"
//                     }
//                 });
//             } else {
//                 res.status(404).json({ massage: "No valid entry found for provided ID" });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// }

// exports.update = (req, res, next) => {
//     const id = req.params.id;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.update({ _id: id }, { $set: updateOps })
//         .exec()
//         .then( result => {
//             console.log(result);
//             res.status(200).json({
//                 massage: 'product updated',
//                 request: {
//                     type: 'PATCH'
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
  
// }

// exports.delete = (req, res, next) => {
//     const id = req.params.productId;
//     Product.remove({ _id: id })
//       .exec()
//       .then(result => {
//         res.status(200).json({
//             message: 'Product deleted',
//             request: {
//                 type: 'POST',
//                 body: { name: 'String', price: 'Number' }
//             }
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   }