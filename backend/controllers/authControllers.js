

// import User  from "../models/UserSchema";

// export const loginUser = async(req, res) =>{
// }

// export const registerUser = async (req, res) => {


//     const { name, email, password } = req.body || {};

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: "Please fill all fields" });
//     }
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     try{
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//          // Check if an image was uploaded via Multer
//         let profileImageUrl;
//         if (req.file) {
//             profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//         }
//           const user = await User.create({ 
//             name, 
//             email, 
//             password,
//             profileImageUrl: profileImageUrl || undefined 
//         });

//             res.status(201).json({
//                 user : {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 profileImageUrl : user.profileImageUrl ,
//             },
//                 token: generateToken(user._id),
//             });
        
//     }catch (error) {
//         res.status(500).json({ message: "Server error"  });
//     }
//     };